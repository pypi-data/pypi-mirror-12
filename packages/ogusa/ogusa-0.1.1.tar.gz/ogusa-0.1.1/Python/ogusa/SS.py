'''
------------------------------------------------------------------------
Last updated: 7/17/2015

Calculates steady state of OLG model with S age cohorts.

This py-file calls the following other file(s):
            tax.py
            household.py
            firm.py
            utils.py
            OUTPUT/Saved_moments/params_given.pkl
            OUTPUT/Saved_moments/params_changed.pkl
            OUTPUT/Saved_moments/labor_data_moments.pkl
            OUTPUT/Saved_moments/SS_init_solutions.pkl
            OUTPUT/Saved_moments/SS_experiment_solutions.pkl

This py-file creates the following other file(s):
    (make sure that an OUTPUT folder exists)
            OUTPUT/Saved_moments/SS_init_solutions.pkl
            OUTPUT/Saved_moments/SS_experiment_solutions.pkl
            OUTPUT/SSinit/ss_init_vars.pkl
            OUTPUT/SS/ss_vars.pkl
------------------------------------------------------------------------
'''

# Packages
import numpy as np
import scipy.optimize as opt
import cPickle as pickle

from . import tax
from . import household
import firm
import utils
import os


'''
------------------------------------------------------------------------
Imported user given values
------------------------------------------------------------------------
'''

from .parameters import get_parameters
globals().update(get_parameters())
from .parameters import DATASET

'''
------------------------------------------------------------------------
    Define Functions
------------------------------------------------------------------------
'''

# missing args are income_tax_params, wealth_tax_params, and ellipse_params


def create_steady_state_parameters(a_tax_income, b_tax_income, c_tax_income,
                                   d_tax_income, b_ellipse, upsilon, J, S, T,
                                   beta, sigma, alpha, Z, delta, ltilde, nu,
                                   g_y, tau_payroll, retire,
                                   mean_income_data, get_baseline,
                                   output_dir="./OUTPUT", **kwargs):

    if get_baseline is False:
        # If this is a tax experiment, also import the changed tax variables
        params_filename = "Saved_moments/params_changed.pkl"
        ss_params_changed_path = os.path.join(output_dir, params_filename)
        variables = pickle.load(open(ss_params_changed_path, 'rb'))
        for key in variables:
            globals()[key] = variables[key]

    # Make a vector of all one dimensional parameters, to be used in the
    # following functions
    income_tax_params = [a_tax_income, b_tax_income, c_tax_income,
                         d_tax_income]
    wealth_tax_params = [h_wealth, p_wealth, m_wealth]
    ellipse_params = [b_ellipse, upsilon]
    parameters = [J, S, T, beta, sigma, alpha, Z, delta, ltilde, nu, g_y,
                  g_n_ss, tau_payroll, retire, mean_income_data] + \
        income_tax_params + wealth_tax_params + ellipse_params
    iterative_params = [maxiter, mindist_SS]
    return (income_tax_params, wealth_tax_params, ellipse_params,
            parameters, iterative_params)


def Euler_equation_solver(guesses, r, w, T_H, factor, j, params, chi_b, chi_n,
                          tau_bq, rho, lambdas, weights, e):
    '''
    Finds the euler error for certain b and n, one ability type at a time.
    Inputs:
        guesses = guesses for b and n (2Sx1 list)
        r = rental rate (scalar)
        w = wage rate (scalar)
        T_H = lump sum tax (scalar)
        factor = scaling factor to dollars (scalar)
        j = which ability group is being solved for (scalar)
        params = list of parameters (list)
        chi_b = chi^b_j (scalar)
        chi_n = chi^n_s (Sx1 array)
        tau_bq = bequest tax rate (scalar)
        rho = mortality rates (Sx1 array)
        lambdas = ability weights (scalar)
        weights = population weights (Sx1 array)
        e = ability levels (Sx1 array)
    Outputs:
        2Sx1 list of euler errors
    '''
    J, S, T, beta, sigma, alpha, Z, delta, ltilde, nu, g_y, g_n_ss, \
        tau_payroll, retire, mean_income_data, a_tax_income, b_tax_income, \
        c_tax_income, d_tax_income, h_wealth, p_wealth, m_wealth, b_ellipse, \
        upsilon = params

    b_guess = np.array(guesses[:S])
    n_guess = np.array(guesses[S:])
    b_s = np.array([0] + list(b_guess[:-1]))
    b_splus1 = b_guess
    b_splus2 = np.array(list(b_guess[1:]) + [0])

    BQ = household.get_BQ(r, b_splus1, weights, lambdas[j], rho, g_n_ss, 'SS')
    theta = tax.replacement_rate_vals(n_guess, w, factor, e[:, j], J, weights,
                                      lambdas[j])

    error1 = household.euler_savings_func(w, r, e[:, j], n_guess, b_s,
                                          b_splus1, b_splus2, BQ, factor, T_H,
                                          chi_b[j], params, theta, tau_bq[j],
                                          rho, lambdas[j])
    error2 = household.euler_labor_leisure_func(w, r, e[:, j], n_guess, b_s,
                                                b_splus1, BQ, factor, T_H,
                                                chi_n, params, theta,
                                                tau_bq[j], lambdas[j])
    # Put in constraints for consumption and savings.
    # According to the euler equations, they can be negative.  When
    # Chi_b is large, they will be.  This prevents that from happening.
    # I'm not sure if the constraints are needed for labor.
    # But we might as well put them in for now.
    mask1 = n_guess < 0
    mask2 = n_guess > ltilde
    mask3 = b_guess <= 0
    error2[mask1] += 1e14
    error2[mask2] += 1e14
    error1[mask3] += 1e14
    tax1 = tax.total_taxes(r, b_s, w, e[:, j], n_guess, BQ, lambdas[j], factor,
                           T_H, None, 'SS', False, params, theta, tau_bq[j])
    cons = household.get_cons(r, b_s, w, e[:, j], n_guess, BQ, lambdas[j],
                              b_splus1, params, tax1)
    mask4 = cons < 0
    error1[mask4] += 1e14
    return list(error1.flatten()) + list(error2.flatten())


def SS_solver(b_guess_init, n_guess_init, wguess, rguess, T_Hguess,
              factorguess, chi_n, chi_b, params, iterative_params, tau_bq,
              rho, lambdas, weights, e):
    '''
    Solves for the steady state distribution of capital, labor, as well as
    w, r, T_H and the scaling factor, using an iterative method similar to TPI.
    Inputs:
        b_guess_init = guesses for b (SxJ array)
        n_guess_init = guesses for n (SxJ array)
        wguess = guess for wage rate (scalar)
        rguess = guess for rental rate (scalar)
        T_Hguess = guess for lump sum tax (scalar)
        factorguess = guess for scaling factor to dollars (scalar)
        chi_n = chi^n_s (Sx1 array)
        chi_b = chi^b_j (Jx1 array)
        params = list of parameters (list)
        iterative_params = list of parameters that determine the convergence
                           of the while loop (list)
        tau_bq = bequest tax rate (Jx1 array)
        rho = mortality rates (Sx1 array)
        lambdas = ability weights (Jx1 array)
        weights = population weights (Sx1 array)
        e = ability levels (SxJ array)
    Outputs:
        solutions = steady state values of b, n, w, r, factor,
                    T_H ((2*S*J+4)x1 array)
    '''
    J, S, T, beta, sigma, alpha, Z, delta, ltilde, nu, g_y, g_n_ss, \
        tau_payroll, retire, mean_income_data, a_tax_income, b_tax_income, \
        c_tax_income, d_tax_income, h_wealth, p_wealth, m_wealth, b_ellipse, \
        upsilon = params

    maxiter, mindist_SS = iterative_params
    # Rename the inputs
    w = wguess
    r = rguess
    T_H = T_Hguess
    factor = factorguess
    bssmat = b_guess_init
    nssmat = n_guess_init

    dist = 10
    iteration = 0
    dist_vec = np.zeros(maxiter)

    while (dist > mindist_SS) and (iteration < maxiter):
        # Solve for the steady state levels of b and n, given w, r, T_H and
        # factor
        for j in xrange(J):
            # Solve the euler equations
            guesses = np.append(bssmat[:, j], nssmat[:, j])
            args_ = (r, w, T_H, factor, j, params, chi_b, chi_n, tau_bq, rho,
                     lambdas, weights, e)
            solutions = opt.fsolve(Euler_equation_solver, guesses * .9,
                                   args=args_, xtol=1e-13)
            bssmat[:, j] = solutions[:S]
            nssmat[:, j] = solutions[S:]
            # print np.array(Euler_equation_solver(np.append(bssmat[:, j],
            # nssmat[:, j]), r, w, T_H, factor, j, params, chi_b, chi_n,
            # theta, tau_bq, rho, lambdas, e)).max()

        K = household.get_K(bssmat, weights.reshape(S, 1),
                            lambdas.reshape(1, J), g_n_ss, 'SS')
        L = firm.get_L(e, nssmat, weights.reshape(S, 1),
                       lambdas.reshape(1, J), 'SS')
        Y = firm.get_Y(K, L, params)
        new_r = firm.get_r(Y, K, params)
        new_w = firm.get_w(Y, L, params)
        b_s = np.array(list(np.zeros(J).reshape(1, J)) + list(bssmat[:-1, :]))
        average_income_model = ((new_r * b_s + new_w * e * nssmat) *
                                weights.reshape(S, 1) *
                                lambdas.reshape(1, J)).sum()
        new_factor = mean_income_data / average_income_model
        new_BQ = household.get_BQ(new_r, bssmat, weights.reshape(S, 1),
                                  lambdas.reshape(1, J), rho.reshape(S, 1),
                                  g_n_ss, 'SS')
        theta = tax.replacement_rate_vals(nssmat, new_w, new_factor, e, J,
                                          weights.reshape(S, 1), lambdas)
        new_T_H = tax.get_lump_sum(new_r, b_s, new_w, e, nssmat, new_BQ,
                                   lambdas.reshape(1, J), factor,
                                   weights.reshape(S, 1), 'SS', params, theta,
                                   tau_bq)

        r = utils.convex_combo(new_r, r, params)
        w = utils.convex_combo(new_w, w, params)
        factor = utils.convex_combo(new_factor, factor, params)
        T_H = utils.convex_combo(new_T_H, T_H, params)
        if T_H != 0:
            dist = np.array([utils.perc_dif_func(new_r, r)] +
                            [utils.perc_dif_func(new_w, w)] +
                            [utils.perc_dif_func(new_T_H, T_H)] +
                            [utils.perc_dif_func(new_factor, factor)]).max()
        else:
            # If T_H is zero (if there are no taxes), a percent difference
            # will throw NaN's, so we use an absoluate difference
            dist = np.array([utils.perc_dif_func(new_r, r)] +
                            [utils.perc_dif_func(new_w, w)] +
                            [abs(new_T_H - T_H)] +
                            [utils.perc_dif_func(new_factor, factor)]).max()
        dist_vec[iteration] = dist
        # Similar to TPI: if the distance between iterations increases, then
        # decrease the value of nu to prevent cycling
        if iteration > 10:
            if dist_vec[iteration] - dist_vec[iteration - 1] > 0:
                nu /= 2.0
                print 'New value of nu:', nu
        iteration += 1
        print "Iteration: %02d" % iteration, " Distance: ", dist

    eul_errors = np.ones(J)
    b_mat = np.zeros((S, J))
    n_mat = np.zeros((S, J))
    # Given the final w, r, T_H and factor, solve for the SS b and n (if you
    # don't do a final fsolve, there will be a slight mismatch,
    # with high euler errors)
    for j in xrange(J):
        args_ = (r, w, T_H, factor, j, params, chi_b, chi_n, tau_bq, rho,
                 lambdas, weights, e)
        solutions1 = opt.fsolve(Euler_equation_solver, np.append(bssmat[:, j],
                                                                 nssmat[:, j]) * .9, args=args_, xtol=1e-13)
        eul_solve = Euler_equation_solver(solutions1, r, w, T_H, factor, j,
                                          params, chi_b, chi_n, tau_bq,
                                          rho, lambdas, weights, e)
        eul_errors[j] = np.array(eul_solve).max()
        b_mat[:, j] = solutions1[:S]
        n_mat[:, j] = solutions1[S:]
    print 'SS fsolve euler error:', eul_errors.max()
    solutions = np.append(b_mat.flatten(), n_mat.flatten())
    other_vars = np.array([w, r, factor, T_H])
    solutions = np.append(solutions, other_vars)
    return solutions


def function_to_minimize(chi_params_scalars, chi_params_init, params,
                         iterative_params, weights_SS, rho_vec, lambdas,
                         tau_bq, e, output_dir):
    '''
    Inputs:
        chi_params_scalars = guesses for multipliers for chi parameters
                             ((S+J)x1 array)
        chi_params_init = chi parameters that will be multiplied
                          ((S+J)x1 array)
        params = list of parameters (list)
        weights_SS = steady state population weights (Sx1 array)
        rho_vec = mortality rates (Sx1 array)
        lambdas = ability weights (Jx1 array)
        tau_bq = bequest tax rates (Jx1 array)
        e = ability levels (Jx1 array)
    Output:
        The sum of absolute percent deviations between the actual and
        simulated wealth moments
    '''
    J, S, T, beta, sigma, alpha, Z, delta, ltilde, nu, g_y, g_n_ss, \
        tau_payroll, retire, mean_income_data, a_tax_income, b_tax_income, \
        c_tax_income, d_tax_income, h_wealth, p_wealth, m_wealth, b_ellipse, \
        upsilon = params

    chi_params_init *= chi_params_scalars
    # print 'Print Chi_b: ', chi_params_init[:J]
    # print 'Scaling vals:', chi_params_scalars[:J]
    ss_init_path = os.path.join(output_dir,
                                "Saved_moments/SS_init_solutions.pkl")
    solutions_dict = pickle.load(open(ss_init_path, "rb"))
    solutions = solutions_dict['solutions']

    b_guess = solutions[:(S * J)]
    n_guess = solutions[S * J:2 * S * J]
    wguess, rguess, factorguess, T_Hguess = solutions[(2 * S * J):]
    solutions = SS_solver(b_guess.reshape(S, J), n_guess.reshape(S, J), wguess,
                          rguess, T_Hguess, factorguess, chi_params_init[J:],
                          chi_params_init[:J], params, iterative_params,
                          tau_bq, rho, lambdas, weights_SS, e)

    b_new = solutions[:(S * J)]
    n_new = solutions[(S * J):(2 * S * J)]
    w_new, r_new, factor_new, T_H_new = solutions[(2 * S * J):]
    # Wealth Calibration Euler
    error5 = list(utils.check_wealth_calibration(b_new.reshape(S, J)[:-1, :],
                                                 factor_new, params))
    # labor calibration euler
    labor_path = os.path.join(
        output_dir, "Saved_moments/labor_data_moments.pkl")
    lab_data_dict = pickle.load(open(labor_path, "rb"))
    labor_sim = (n_new.reshape(S, J) * lambdas.reshape(1, J)).sum(axis=1)
    if DATASET == 'SMALL':
        lab_dist_data = lab_data_dict['labor_dist_data'][:S]
    else:
        lab_dist_data = lab_data_dict['labor_dist_data']

    error6 = list(utils.perc_dif_func(labor_sim, lab_dist_data))
    # combine eulers
    output = np.array(error5 + error6)
    # Constraints
    eul_error = np.ones(J)
    for j in xrange(J):
        eul_error[j] = np.abs(Euler_equation_solver(np.append(b_new.reshape(S, J)[:, j], n_new.reshape(S, J)[:, j]), r_new, w_new,
                                                    T_H_new, factor_new, j, params, chi_params_init[:J], chi_params_init[J:], tau_bq, rho, lambdas, weights_SS, e)).max()
    fsolve_no_converg = eul_error.max()
    if np.isnan(fsolve_no_converg):
        fsolve_no_converg = 1e6
    if fsolve_no_converg > 1e-4:
        # If the fsovle didn't converge (was NaN or above the tolerance), then tell the minimizer that this is a bad place to be
        # and don't save the solutions as initial guesses (since they might be
        # gibberish)
        output += 1e14
    else:
        var_names = ['solutions']
        dictionary = {}
        for key in var_names:
            dictionary[key] = locals()[key]
        ss_init_path = os.path.join(
            output_dir, "Saved_moments/SS_init_solutions.pkl")
        pickle.dump(dictionary, open(ss_init_path, "wb"))
    if (chi_params_init <= 0.0).any():
        # In case the minimizer doesn't respect the bounds given
        output += 1e14
    # Use generalized method of moments to fit the chi's
    weighting_mat = np.eye(2 * J + S)
    scaling_val = 100.0
    value = np.dot(scaling_val * np.dot(output.reshape(1, 2 * J + S),
                                        weighting_mat), scaling_val * output.reshape(2 * J + S, 1))
    print 'Value of criterion function: ', value.sum()
    return value.sum()


def run_steady_state(ss_parameters, iterative_params, get_baseline=False, calibrate_model=False,
                     output_dir="./OUTPUT"):
    '''
    ------------------------------------------------------------------------
        Run SS
    ------------------------------------------------------------------------
    '''

    if get_baseline:
        # Generate initial guesses for chi^b_j and chi^n_s
        chi_params = np.zeros(S + J)
        chi_params[:J] = chi_b_guess
        chi_params[J:] = chi_n_guess
        # First run SS simulation with guesses at initial values for b, n, w, r, etc
        # For inital guesses of b and n, we choose very small b, and medium n
        b_guess = np.ones((S, J)).flatten() * .01
        n_guess = np.ones((S, J)).flatten() * .5 * ltilde
        # For initial guesses of w, r, T_H, and factor, we use values that are close
        # to some steady state values.
        wguess = 1.2
        rguess = .06
        T_Hguess = 0
        factorguess = 100000
        solutions = SS_solver(b_guess.reshape(S, J), n_guess.reshape(S, J), wguess, rguess, T_Hguess, factorguess, chi_params[
                              J:], chi_params[:J], ss_parameters, iterative_params, tau_bq, rho, lambdas, omega_SS, e)

        if calibrate_model:
            outputs = {'solutions': solutions, 'chi_params': chi_params}
            ss_init_path = os.path.join(
                output_dir, "Saved_moments/SS_init_solutions.pkl")
            pickle.dump(outputs, open(ss_init_path, "wb"))
            function_to_minimize_X = lambda x: function_to_minimize(
                x, chi_params, ss_parameters, iterative_params, omega_SS, rho, lambdas, tau_bq, e, output_dir)
            bnds = tuple([(1e-6, None)] * (S + J))
            # In order to scale all the parameters to estimate in the minimizer, we have the minimizer fit a vector of ones that
            # will be multiplied by the chi initial guesses inside the function.  Otherwise, if chi^b_j=1e5 for some j, and the
            # minimizer peturbs that value by 1e-8, the % difference will be extremely small, outside of the tolerance of the
            # minimizer, and it will not change that parameter.
            chi_params_scalars = np.ones(S + J)
            chi_params_scalars = opt.minimize(function_to_minimize_X, chi_params_scalars,
                                              method='TNC', tol=MINIMIZER_TOL, bounds=bnds, options=MINIMIZER_OPTIONS).x
            chi_params *= chi_params_scalars
            print 'The final scaling params', chi_params_scalars
            print 'The final bequest parameter values:', chi_params

            solutions_dict = pickle.load(open(ss_init_path, "rb"))
            solutions = solutions_dict['solutions']
            b_guess = solutions[:S * J]
            n_guess = solutions[S * J:2 * S * J]
            wguess, rguess, factorguess, T_Hguess = solutions[2 * S * J:]
            solutions = SS_solver(b_guess.reshape(S, J), n_guess.reshape(S, J), wguess, rguess, T_Hguess, factorguess, chi_params[
                                  J:], chi_params[:J], ss_parameters, iterative_params, tau_bq, rho, lambdas, omega_SS, e)
    else:
        variables = pickle.load(open(ss_init_path, "rb"))
        solutions = solutions_dict['solutions']
        chi_params = solutions_dict['chi_params']
        b_guess = solutions[:S * J]
        n_guess = solutions[S * J:2 * S * J]
        wguess, rguess, factorguess, T_Hguess = solutions[2 * S * J:]
        solutions = SS_solver(b_guess.reshape(S, J), n_guess.reshape(S, J), wguess, rguess, T_Hguess, factorguess, chi_params[
                              J:], chi_params[:J], ss_parameters, iterative_params, tau_bq, rho, lambdas, omega_SS, e)

    '''
    ------------------------------------------------------------------------
        Generate the SS values of variables, including euler errors
    ------------------------------------------------------------------------
    '''

    if get_baseline:
        outputs = {'solutions': solutions, 'chi_params': chi_params}
        ss_init_dir = os.path.join(
            output_dir, "Saved_moments/SS_init_solutions.pkl")
        pickle.dump(outputs, open(ss_init_dir, "wb"))
    else:
        outputs = {'solutions': solutions, 'chi_params': chi_params}
        ss_exp_dir = os.path.join(
            output_dir, "Saved_moments/SS_experiment_solutions.pkl")
        pickle.dump(outputs, open(ss_exp_dir, "wb"))

    bssmat = solutions[0:(S - 1) * J].reshape(S - 1, J)
    bq = solutions[(S - 1) * J:S * J]
    bssmat_s = np.array(list(np.zeros(J).reshape(1, J)) + list(bssmat))
    bssmat_splus1 = np.array(list(bssmat) + list(bq.reshape(1, J)))
    nssmat = solutions[S * J:2 * S * J].reshape(S, J)
    wss, rss, factor_ss, T_Hss = solutions[2 * S * J:]

    Kss = household.get_K(bssmat_splus1, omega_SS.reshape(
        S, 1), lambdas, g_n_ss, 'SS')
    Lss = firm.get_L(e, nssmat, omega_SS.reshape(S, 1), lambdas, 'SS')
    Yss = firm.get_Y(Kss, Lss, ss_parameters)

    Iss = firm.get_I(Kss, Kss, delta, g_y, g_n_ss)

    theta = tax.replacement_rate_vals(
        nssmat, wss, factor_ss, e, J, omega_SS.reshape(S, 1), lambdas)
    BQss = household.get_BQ(rss, bssmat_splus1, omega_SS.reshape(
        S, 1), lambdas, rho.reshape(S, 1), g_n_ss, 'SS')
    b_s = np.array(list(np.zeros(J).reshape((1, J))) + list(bssmat))
    taxss = tax.total_taxes(rss, b_s, wss, e, nssmat, BQss, lambdas,
                            factor_ss, T_Hss, None, 'SS', False, ss_parameters, theta, tau_bq)
    cssmat = household.get_cons(rss, b_s, wss, e, nssmat, BQss.reshape(
        1, J), lambdas.reshape(1, J), bssmat_splus1, ss_parameters, taxss)

    Css = household.get_C(cssmat, omega_SS.reshape(S, 1), lambdas, 'SS')

    resource_constraint = Yss - (Css + Iss)

    print 'Resource Constraint Difference:', resource_constraint

    household.constraint_checker_SS(bssmat, nssmat, cssmat, ss_parameters)

    b_s = np.array(list(np.zeros(J).reshape((1, J))) + list(bssmat))
    b_splus1 = bssmat_splus1
    b_splus2 = np.array(
        list(bssmat_splus1[1:]) + list(np.zeros(J).reshape((1, J))))

    chi_b = np.tile(chi_params[:J].reshape(1, J), (S, 1))
    chi_n = np.array(chi_params[J:])
    euler_savings = np.zeros((S, J))
    euler_labor_leisure = np.zeros((S, J))
    for j in xrange(J):
        euler_savings[:, j] = household.euler_savings_func(wss, rss, e[:, j], nssmat[:, j], b_s[:, j], b_splus1[:, j], b_splus2[
                                                           :, j], BQss[j], factor_ss, T_Hss, chi_b[:, j], ss_parameters, theta[j], tau_bq[j], rho, lambdas[j])
        euler_labor_leisure[:, j] = household.euler_labor_leisure_func(wss, rss, e[:, j], nssmat[:, j], b_s[
                                                                       :, j], b_splus1[:, j], BQss[j], factor_ss, T_Hss, chi_n, ss_parameters, theta[j], tau_bq[j], lambdas[j])
    '''
    ------------------------------------------------------------------------
        Save the values in various ways, depending on the stage of
            the simulation, to be used in TPI or graphing functions
    ------------------------------------------------------------------------
    '''

    # Pickle variables
    output = {'Kss': Kss, 'bssmat': bssmat, 'Lss': Lss, 'nssmat': nssmat, 'Yss': Yss,
              'wss': wss, 'rss': rss, 'theta': theta, 'BQss': BQss, 'factor_ss': factor_ss,
              'bssmat_s': bssmat_s, 'cssmat': cssmat, 'bssmat_splus1': bssmat_splus1,
              'T_Hss': T_Hss, 'euler_savings': euler_savings,
              'euler_labor_leisure': euler_labor_leisure, 'chi_n': chi_n,
              'chi_b': chi_b}
    if get_baseline:
        utils.mkdirs(os.path.join(output_dir, "SSinit"))
        ss_init_dir = os.path.join(output_dir, "SSinit/ss_init_vars.pkl")
        pickle.dump(output, open(ss_init_dir, "wb"))
        bssmat_init = bssmat_splus1
        nssmat_init = nssmat
        # Pickle variables for TPI initial values
        output2 = {'bssmat_init': bssmat_init, 'nssmat_init': nssmat_init}
        ss_init_tpi = os.path.join(output_dir, "SSinit/ss_init_tpi_vars.pkl")
        pickle.dump(output2, open(ss_init_tpi, "wb"))
    else:
        utils.mkdirs(os.path.join(output_dir, "SS"))
        ss_vars = os.path.join(output_dir, "SS/ss_vars.pkl")
        pickle.dump(output, open(ss_vars, "wb"))
    return output
