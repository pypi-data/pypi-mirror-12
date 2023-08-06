all: upload_to_pypi clean

upload_to_pypi: README.rst
	python setup.py sdist upload -r pypi

README.rst: README.md
	~/.cabal/bin/pandoc --from=markdown --to=rst README.md -o README.rst

clean:
	rm README.rst