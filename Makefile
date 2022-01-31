prettier-write:
	npx prettier-eslint --write **/*.js

install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test

.PHONY: test prettier-write
