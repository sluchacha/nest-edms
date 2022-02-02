'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-edms documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicantsModule.html" data-type="entity-link" >ApplicantsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' : 'data-target="#xs-controllers-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' :
                                            'id="xs-controllers-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' }>
                                            <li class="link">
                                                <a href="controllers/ApplicantsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicantsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' : 'data-target="#xs-injectables-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' :
                                        'id="xs-injectables-links-module-ApplicantsModule-eb1d3b63d729dd412da8454f86249648497ba7d64028b70818654a414009961fb15d5de154f6475797fc7c86262235e175cb648067cd40d4dbb65e966ef3744e"' }>
                                        <li class="link">
                                            <a href="injectables/ApplicantsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicantsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ApplicationsModule.html" data-type="entity-link" >ApplicationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' : 'data-target="#xs-controllers-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' :
                                            'id="xs-controllers-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' }>
                                            <li class="link">
                                                <a href="controllers/ApplicationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' : 'data-target="#xs-injectables-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' :
                                        'id="xs-injectables-links-module-ApplicationsModule-b12f8c7438508d021b1a4e416eb81a76edbb0995d37c4e3416a6684378a4893502166ec1e1eef9a35bcdcd78f4868cc422885ef841316f9e66e17581873b4abb"' }>
                                        <li class="link">
                                            <a href="injectables/ApplicationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' : 'data-target="#xs-controllers-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' :
                                            'id="xs-controllers-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' : 'data-target="#xs-injectables-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' :
                                        'id="xs-injectables-links-module-AppModule-f8c9f41764e28bfe621fb963e8752c708b3245cb8292c8e0101106bb075bdcf4deccc817856fb199869b81927a8cdc8591657613ce6f6a3f30ba4c91857ac007"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' : 'data-target="#xs-controllers-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' :
                                            'id="xs-controllers-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' : 'data-target="#xs-injectables-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' :
                                        'id="xs-injectables-links-module-AuthModule-c5258dbdc8d3c471f318a6b9bc60aed933efff9c70570eaa70680ebaa5867a912401627c687d26579781b0d38c81731eb0970f99173cb340c7bfc8cd84a1c89d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeatureConfigModule.html" data-type="entity-link" >FeatureConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' : 'data-target="#xs-controllers-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' :
                                            'id="xs-controllers-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' : 'data-target="#xs-injectables-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' :
                                        'id="xs-injectables-links-module-FilesModule-9788f5238bce5d9b091129abe0359e473fc4d5b9d67f5d2490cb0e55af1657e115d2dcab074ae92f19b089de50cf88fd622330d2e78b5c4b86b30b163c650fc5"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' : 'data-target="#xs-controllers-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' :
                                            'id="xs-controllers-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' : 'data-target="#xs-injectables-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' :
                                        'id="xs-injectables-links-module-JobsModule-72f9bdcecfc598c644a476108b4dcc131d11033e87392e78cdb7718819d81ac371f29050f1c769be8efd0dda6fff996d89ed462c3ba5ec9d34422a9cc91ee624"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationsModule.html" data-type="entity-link" >OrganizationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' : 'data-target="#xs-controllers-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' :
                                            'id="xs-controllers-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' }>
                                            <li class="link">
                                                <a href="controllers/OrganizationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' : 'data-target="#xs-injectables-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' :
                                        'id="xs-injectables-links-module-OrganizationsModule-224cfad411e9c03cd4dda7dbf91e2b5a578ceaa795bc17cd1f2bad2d345d8dae48d476370375879a325cc2d8f9b5a07434cf594c1e70cbd35fab8804f567dce3"' }>
                                        <li class="link">
                                            <a href="injectables/OrganizationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-59b7bc1ec0603fd59cf5d46e29a482450ba821a1f141ef06df6b7487e76f89437da503a6217f8dacbb4e37e5d3624a33639fdbb3cef8c86c21dabac9409b356d"' : 'data-target="#xs-controllers-links-module-UsersModule-59b7bc1ec0603fd59cf5d46e29a482450ba821a1f141ef06df6b7487e76f89437da503a6217f8dacbb4e37e5d3624a33639fdbb3cef8c86c21dabac9409b356d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-59b7bc1ec0603fd59cf5d46e29a482450ba821a1f141ef06df6b7487e76f89437da503a6217f8dacbb4e37e5d3624a33639fdbb3cef8c86c21dabac9409b356d"' :
                                            'id="xs-controllers-links-module-UsersModule-59b7bc1ec0603fd59cf5d46e29a482450ba821a1f141ef06df6b7487e76f89437da503a6217f8dacbb4e37e5d3624a33639fdbb3cef8c86c21dabac9409b356d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ApplicantsController.html" data-type="entity-link" >ApplicantsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ApplicationsController.html" data-type="entity-link" >ApplicationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrganizationsController.html" data-type="entity-link" >OrganizationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Applicant.html" data-type="entity-link" >Applicant</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplicantSnippetDto.html" data-type="entity-link" >ApplicantSnippetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Application.html" data-type="entity-link" >Application</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateApplicantDto.html" data-type="entity-link" >CreateApplicantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateApplicationDto.html" data-type="entity-link" >CreateApplicationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrganizationDto.html" data-type="entity-link" >CreateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityRepository.html" data-type="entity-link" >EntityRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDocument.html" data-type="entity-link" >FileDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDto.html" data-type="entity-link" >FileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FutureCreateApplicationDto.html" data-type="entity-link" >FutureCreateApplicationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FutureUpdateApplicationDto.html" data-type="entity-link" >FutureUpdateApplicationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Organization.html" data-type="entity-link" >Organization</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonDto.html" data-type="entity-link" >PersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Qualification.html" data-type="entity-link" >Qualification</a>
                            </li>
                            <li class="link">
                                <a href="classes/QualificationDto.html" data-type="entity-link" >QualificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Region.html" data-type="entity-link" >Region</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegionDto.html" data-type="entity-link" >RegionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateApplicantDto.html" data-type="entity-link" >UpdateApplicantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateApplicationDto.html" data-type="entity-link" >UpdateApplicationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrganizationDto.html" data-type="entity-link" >UpdateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSnippetDto.html" data-type="entity-link" >UserSnippetDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AbstractService.html" data-type="entity-link" >AbstractService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApplicantsService.html" data-type="entity-link" >ApplicantsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApplicationsService.html" data-type="entity-link" >ApplicationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingMiddleware.html" data-type="entity-link" >LoggingMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationsService.html" data-type="entity-link" >OrganizationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionInterceptor.html" data-type="entity-link" >TransactionInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersRepository.html" data-type="entity-link" >UsersRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateObjectIdPipe.html" data-type="entity-link" >ValidateObjectIdPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WrapResponseInterceptor.html" data-type="entity-link" >WrapResponseInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ApiKeyGuard.html" data-type="entity-link" >ApiKeyGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PermissionsGuard.html" data-type="entity-link" >PermissionsGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ClassType.html" data-type="entity-link" >ClassType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});