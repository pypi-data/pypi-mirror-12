#!/usr/bin/env python
import numpy as np
import naima
import astropy.units as u
from astropy.io import ascii

## Model definition

from naima.models import InverseCompton, ExponentialCutoffPowerLaw

def ElectronIC(pars,data):

    # Match parameters to ECPL properties, and give them the appropriate units
    amplitude = pars[0] / u.eV
    alpha = pars[1]
    e_cutoff = (10**pars[2])*u.TeV

    # Initialize instances of the particle distribution and radiative model
    ECPL = ExponentialCutoffPowerLaw(amplitude,10.*u.TeV, alpha, e_cutoff)
    IC = InverseCompton(ECPL,seed_photon_fields=['CMB'])

    # compute flux at the energies given in data['energy'], and convert to units
    # of flux data
    model = IC.flux(data,distance=2.0*u.kpc).to(data['flux'].unit)

    # Save this realization of the particle distribution function
    elec_energy = np.logspace(11,15,100) * u.eV
    nelec = ECPL(elec_energy)

    # Compute and save total energy in electrons above 1 TeV
    We = IC.compute_We(Eemin=1*u.TeV)

    # The first array returned will be compared to the observed spectrum for
    # fitting. All subsequent objects will be stores in the sampler metadata
    # blobs.
    return model, (elec_energy,nelec), We

## Prior definition

def lnprior(pars):
    """
    Return probability of parameter values according to prior knowledge.
    Parameter limits should be done here through uniform prior ditributions
    """

    logprob = naima.uniform_prior(pars[0],0.,np.inf) \
                + naima.uniform_prior(pars[1],-1,5)

    return logprob

if __name__=='__main__':

## Set initial parameters and labels

    p0=np.array((1e30,3.0,np.log10(30),))
    labels=['norm','index','log10(cutoff)']

    from astropy.extern import six
    from six.moves import cPickle

    import os,sys
    samplerf = 'CrabNebula_IC_sampler.pickle'
    if os.path.exists(samplerf) and 'onlyplot' in sys.argv:
        sampler = cPickle.load(open(samplerf,'rb'))
    else:
    ## Read data
        data=ascii.read('../../examples/CrabNebula_HESS_2006_ipac.dat')
    # Run sampler
        sampler,pos = naima.run_sampler(data_table=data, p0=p0, labels=labels, model=ElectronIC,
                prior=lnprior, nwalkers=128, nburn=100, nrun=100, threads=4, prefit=True)
    # Save sampler
        sampler.pool=None
        cPickle.dump(sampler,open(samplerf,'wb'))

## Diagnostic plots

    #naima.save_diagnostic_plots('CrabNebula_IC',sampler,sed=True,last_step=False, pdf=True,
            #blob_labels=['Spectrum', 'Electron energy distribution', '$W_e (E_e>1\,\mathrm{TeV})$'])
    naima.save_results_table('CrabNebula_IC',sampler)
    from astropy.io import ascii
    results = ascii.read('CrabNebula_IC_results.ecsv')
    results.remove_row(-1) # remove blob2
    for col in ['median','unc_lo','unc_hi']:
        results[col].format = '.3g'

    with open('CrabNebula_IC_results_table.txt','w') as f:
        info = []
        for key in ['n_walkers','n_run','p0','ML_pars','MaxLogLikelihood']:
            info.append('{0:<18}: {1}\n'.format(key,str(results.meta[key])))
        f.writelines(info)
        f.write('\n')
        f.write('------------- ------- ------- --------\n')
        results.write(f,format='ascii.fixed_width_two_line')

    print('Plotting chains...')
    f = naima.plot_chain(sampler, 1)
    f.savefig('CrabNebula_IC_chain_index.png')
    f = naima.plot_chain(sampler, 2)
    f.savefig('CrabNebula_IC_chain_cutoff.png')

    #e_range = [sampler.data['energy'][0]/5, sampler.data['energy'][-1]*5]
    e_range = [100*u.GeV, 100*u.TeV]

    # with samples
    print('Plotting samples...')
    f = naima.plot_fit(sampler, 0, ML_info=False)
    f.axes[0].set_ylim(1e-13,2e-10)
    f.tight_layout()
    f.subplots_adjust(hspace=0)
    f.savefig('CrabNebula_IC_model_samples.png')
    print('Plotting samples with e_range...')
    f = naima.plot_fit(sampler, 0, e_range=e_range, ML_info=False, n_samples=500)
    f.axes[0].set_ylim(1e-13,2e-10)
    f.tight_layout()
    f.subplots_adjust(hspace=0)
    f.savefig('CrabNebula_IC_model_samples_erange.png')
    #f.savefig('CrabNebula_IC_model_samples_erange.pdf')

    # with confs
    print('Plotting confs...')
    f = naima.plot_fit(sampler, 0, ML_info=False, confs=[3,1],last_step=False)
    f.axes[0].set_ylim(1e-13,2e-10)
    f.tight_layout()
    f.subplots_adjust(hspace=0)
    f.savefig('CrabNebula_IC_model_confs.png')
    print('Plotting confs with e_range...')
    f = naima.plot_fit(sampler, 0, e_range=e_range, ML_info=False, confs=[3,1])
    f.axes[0].set_ylim(1e-13,2e-10)
    f.tight_layout()
    f.subplots_adjust(hspace=0)
    f.savefig('CrabNebula_IC_model_confs_erange.png')

    print('Plotting corner...')
    f = naima.plot_corner(sampler)
    f.savefig('CrabNebula_IC_corner.png')

    print('Plotting blobs...')
    f = naima.plot_blob(sampler, 1, ML_info=False, label='Electron energy distribution',
            xlabel=r'Electron energy [$\mathrm{TeV}$]')
    f.tight_layout()
    f.savefig('CrabNebula_IC_pdist.png')
    f = naima.plot_blob(sampler, 2, label=r'$W_e(E_e>1\,\mathrm{TeV})$')
    f.savefig('CrabNebula_IC_We.png')

