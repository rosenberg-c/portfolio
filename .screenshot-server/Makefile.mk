SCREENSHOT_SERVER ?= local_screenshot-server

.PHONY: start-screenshot-server stop-screenshot-server

screenshot-server-start:
	docker run -d --name $(SCREENSHOT_SERVER) \
		--label "dev.local.screenshot-server=$(CURDIR)" \
		-p 5199:80 -v "$(CURDIR)/dist:/usr/share/nginx/html:ro" nginx:alpine
	curl --fail --silent --show-error --retry 10 \
		--retry-connrefused \
		--retry-delay 1 http://localhost:5199/ -o /dev/null

screenshot-server-stop:
	@test "$$(docker inspect -f '{{ index .Config.Labels "dev.local.screenshot-server" }}' $(SCREENSHOT_SERVER))" = "$(CURDIR)" || { echo "Refusing to stop container not owned by this checkout" >&2; exit 1; }
	docker rm -f $(SCREENSHOT_SERVER)
