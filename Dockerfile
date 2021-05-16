FROM debian:bullseye-slim
LABEL name="clank-rest"
LABEL description="Clank REST API server"
LABEL maintainer="hashsploit <hashsploit@protonmail.com>"

# Install dependencies
RUN echo "Updating packages ..." \
	&& apt-get update -y >/dev/null 2>&1 \
	&& echo "Installing dependencies ..." \
	&& apt-get install -y \
	curl \
	nodejs \
	npm >/dev/null 2>&1

# Remove bloat
RUN rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
	&& apt-get autoremove --purge -y \
	&& apt-get clean -y \
	&& rm -rf /usr/share/man \
	&& rm -rf /usr/share/locale \
	&& rm -rf /usr/share/doc \
	&& mkdir -p /etc/initramfs-tools/conf.d/ \
	&& echo "COMPRESS=xz" | tee /etc/initramfs-tools/conf.d/compress >/dev/null 2>&1

ENTRYPOINT ["/bin/bash", "/opt/launch.sh"]
