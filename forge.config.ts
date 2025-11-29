import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/pages/login/login.html',
            js: './src/pages/login/login.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
      },
      {
            html: './src/pages/home/home.html',
            js: './src/pages/home/home.ts',
            name: 'home_window',
            preload: {
              js: './src/preload.ts',

            },  
          },
      {
            html: './src/pages/registro/regis.html',
            js: './src/pages/registro/regis.ts',
            name: 'registro_window',
            preload: {
              js: './src/preload.ts',

            },  
          },
          {
            html: './src/pages/principal/princi.html',
            js: './src/pages/principal/princi.ts',
            name: 'principal_window',
            preload: {
              js: './src/preload.ts',

            },  
          },
          {
            html: './src/pages/usuariocontrol/userad.html',
            js: './src/pages/usuariocontrol/userad.ts',
            name: 'admin_window',
            preload: {
              js: './src/preload.ts',

            },  
          },
          {
            html: './src/pages/editarusuario/edit.html',
            js: './src/pages/editarusuario/edit.ts',
            name: 'editar_window',
            preload: {
              js: './src/preload.ts',

            },  
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
