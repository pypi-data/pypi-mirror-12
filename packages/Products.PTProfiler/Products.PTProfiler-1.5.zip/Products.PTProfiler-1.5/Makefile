PHONY: plone4.0 plone4.1 plone4.2 plone4.3 plone5.0

ifneq ($(strip $(TRAVIS)),)
IS_TRAVIS = yes
endif

ifdef IS_TRAVIS

PIP = pip
PYTHON26 = python2.6
PYTHON27 = python2.7

else

PIP = bin/pip
PYTHON26 = bin/python2.6
PYTHON27 = bin/python2.7

endif

plone4.0:
	$(PIP) install setuptools==0.6c11
	$(PYTHON26) bootstrap.py --version
	$(PYTHON26) bootstrap.py --setuptools-version=0.6c11 --buildout-version=1.4.4 -c plone40.cfg
	bin/buildout -vc plone40.cfg

plone4.1:
	$(PIP) install setuptools==0.6c11
	$(PYTHON26) bootstrap.py --version
	$(PYTHON26) bootstrap.py --setuptools-version=0.6c11 --buildout-version=1.4.4 -c plone41.cfg
	bin/buildout -vc plone41.cfg

plone4.2:
	$(PIP) install setuptools==0.6c11
	$(PYTHON26) bootstrap.py --version
	$(PYTHON26) bootstrap.py --setuptools-version=0.6c11 --buildout-version=1.7.1 -c plone42.cfg
	bin/buildout -vc plone42.cfg

plone4.3:
	$(PIP) install setuptools==0.6c11
	$(PYTHON27) bootstrap.py --version
	$(PYTHON27) bootstrap.py --setuptools-version=0.6c11 --buildout-version=1.7.1 -c plone43.cfg
	bin/buildout -vc plone43.cfg

plone5.0:
	$(PYTHON27) bootstrap.py --version
	$(PYTHON27) bootstrap.py --setuptools-version=18.3.1 --buildout-version=2.4.3 -c plone50.cfg
	bin/buildout -vc plone50.cfg
