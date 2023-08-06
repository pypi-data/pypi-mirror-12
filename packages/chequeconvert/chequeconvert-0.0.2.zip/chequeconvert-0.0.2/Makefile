deps:
	pip install -r requirements.txt

deps-dev:
	pip install -r requirements_dev.txt

test: clean unit

clean:
	find . -name "*.py[co]" -delete

unit:
	nosetests --with-coverage --cover-package=chequeconvert

publish:
	python setup.py sdist upload
