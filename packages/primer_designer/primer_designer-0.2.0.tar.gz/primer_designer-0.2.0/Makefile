.PHONY:test release

test:
	nosetests tests

coverage:
	nosetests --with-coverage --cover-package=primer_designer tests
	coverage html

release:
	python setup.py sdist bdist_wheel upload
