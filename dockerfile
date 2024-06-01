# Usa una imagen base con Android SDK y JDK 11
FROM openjdk:11-jdk-slim

# Instala herramientas necesarias
RUN apt-get update && \
    apt-get install -y wget curl git unzip && \
    rm -rf /var/lib/apt/lists/*

# Instala Node.js y npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


# Instala Android SDK
RUN mkdir -p /usr/local/android-sdk && \
    cd /usr/local/android-sdk && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip && \
    unzip commandlinetools-linux-6609375_latest.zip && \
    rm commandlinetools-linux-6609375_latest.zip

# Configura variables de entorno para Android SDK
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/bin:${ANDROID_SDK_ROOT}/tools:${ANDROID_SDK_ROOT}/tools/bin:${ANDROID_SDK_ROOT}/platform-tools

# Instala los paquetes necesarios del SDK de Android y acepta las licencias
RUN mkdir -p ~/.android && touch ~/.android/repositories.cfg && yes | sdkmanager --licenses

# Instala build-tools y plataformas específicas (puedes ajustar las versiones según tus necesidades)
RUN yes | sdkmanager --update
RUN yes | sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"

# Copia el proyecto al contenedor
WORKDIR /app
COPY . /app

# Instala dependencias del proyecto
RUN npm install

# Exponer el puerto de desarrollo de React Native
EXPOSE 8081

# Comando por defecto para iniciar el servidor de desarrollo
CMD ["npm", "start"]
