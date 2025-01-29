SHELL=/bin/bash

$(shell if ! [[ -e .env ]]; then cp .env.example .env; fi)

include .env
export

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Create the Docker containers
	@if ! [[ -e .env ]]; then \
		cp .env.example .env; \
	fi
	docker compose up --build -d --remove-orphans

down: ## Stop and remove Docker containers
	docker compose down --remove-orphans

restart: down up ## Remove and recreate the Docker containers

nuke: ## Delete all docker containers and rebuild
	@docker compose down --rmi all -v

bash: ## Create a bash session in the webserver container
	docker compose exec webserver bash

logs-web: ## Display webserver logs
	docker logs cromwell-ui-webserver-1