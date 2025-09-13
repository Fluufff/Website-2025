FROM mcr.microsoft.com/vscode/devcontainers/base:bookworm

ENV DENO_INSTALL=/deno
RUN mkdir /dino && \
    curl -fsSL https://deno.land/x/install/install.sh | sh

ENV PATH=/deno/bin:${PATH}
