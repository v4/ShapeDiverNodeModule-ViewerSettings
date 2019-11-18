import { ISetting } from "../../interfaces/interfaces";
import { SettingsVersion } from "../../SettingsVersion";
import { Setting } from "../../Setting";
import { ISettingsObject } from "./interfaces";
import { Settings as OldSettings } from "../1.0/Settings";
import { BaseSettings } from "../../BaseSettings";
import typeChecks from "shapedivernodemodule-typechecks";

export class Settings extends BaseSettings {
    // #region Properties (1)

    protected _settings: ISettingsObject;

    // #endregion Properties (1)

    // #region Constructors (1)

    /**
     * 
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    constructor(settingsJSON?: any) {
        super();
        this._version = new SettingsVersion('2.0');

        this._settings = {
            build_date: new Setting('', typeChecks.string.name, '', false),
            build_version: new Setting('', typeChecks.string.name, '', false),
            settings_version: new Setting('2.0', typeChecks.string.name, '', false),

            ar: {
                enableCameraSync: new Setting(false, typeChecks.boolean.name, 'Enable / disable synchronisation of the camera with AR tracking information. Enabling this will disable the orbit controls.', false),
                enableCameraSyncInitial: new Setting(false, typeChecks.boolean.name, 'Enable / disable the inital synchronisation of the camera with AR tracking information. Enabling this will disable the orbit controls.'),
                enableLightingEstimation: new Setting(true, typeChecks.boolean.name, 'Enable / disable automatic lighting estimation. Enabling this stores the current state of the lights which will get restored once automatic lighting estimation gets disabled again.'),
                enableTouchControls: new Setting(true, typeChecks.boolean.name, 'Enable / disable touch controls for placement of objects in the AR scene while AR camera synchronisation is enabled.'),
                enableTouchControlRotation: new Setting(true, typeChecks.boolean.name, 'Enable / disable rotation of objects in the AR scene by means of touch controls. Typically this should be enabled for objects to be placed horizontally.'),
                enableAutomaticPlacement: new Setting(true, typeChecks.boolean.name, 'Enable / disable initial automatic placement of objects in the AR scene as soon as plane anchors get detected. Automatic placement stops once the user starts to interact.'),
                defaultHitTestType: new Setting('existingPlaneUsingGeometry', (value: string) => ['featurePoint', 'estimatedHorizontalPlane', 'estimatedVerticalPlane', 'existingPlane', 'existingPlaneUsingExtent', 'existingPlaneUsingGeometry'].includes(value), 'Default type of feature to use for hit tests, used by touch controls. '),
            },
            // constructor: {
            //     useQueryStringParameters: new Setting(false, typeChecks.boolean.name, 'if true, the constructor tries to read settings from the query string, existing settings will not be overridden'),
            //     forceQueryStringParameters: new Setting(false, typeChecks.boolean.name, 'if true, the constructor tries to read settings from the query string existing settings will be overridden'),
            //     apiversion: new Setting('2', typeChecks.string.name, 'major version of the API to return by default'),
            //     runtimeId: new Setting('', typeChecks.string.name, 'runtimeId to set for returned API object, a random one will be chosen by default'),
            //     arkitbridge: new Setting(false, typeChecks.boolean.name, 'enable bridge to ShapeDiver iOS app using ARKit'),
            //     modelViewUrl: new Setting('us-east-1', typeChecks.string.name, 'optional model view url to pass to the default CommPlugin, a leading \'https://\' will be prefixed if not in place, \'us-east-1\' and \'eu-central-1\' may be used as abbreviations for ShapeDiver\'s default systems'),
            //     ticket: new Setting('' , typeChecks.string.name, 'optional model view ticket to be used for immediately instantiating a CommPlugin instance. No CommPlugin instance will be registered by the constructor if this is empty. Further CommPlugin instances can be initialized after the constructor has finished, using the API v2 function {@link module:ApiInterfaceV2~ApiPluginInterface#registerCommPluginAsync registerCommPluginAsync}.'),
            //     authorization: new Setting('', typeChecks.string.name, 'optional authorization token to include with requests to the model view interface (prepend \'Bearer \' yourself if necessary)'),
            //     iframeId: new Setting('sdv-iframe', typeChecks.string.name),
            //     iframeDebugging: new Setting(false, typeChecks.boolean.name)
            // },
            // browserUI: {
            //     anchorElements: new Setting(true, typeChecks.boolean.name, 'choose whether the default handler for creating DOM elements representing anchors shall be instantiated'),
            //     brandedMode: new Setting(true, typeChecks.boolean.name, 'choose whether ShapeDiver branding shall be shown during initial loading'),
            //     brandedModeConsole: new Setting(null, typeChecks.any.name),
            //     busyGraphic: new Setting('', typeChecks.string.name, 'optional URL to an image which shall be shown instead of the busy spinner'),
            //     containerControls: new Setting(undefined, typeChecks.any.name, 'optional container to use for creating parameter controls, may be undefined in which case a DOM element whose id is domElementIdPrefix+\'-controls\' will be looked for. Set this to a falsy value different from `undefined` to prevent the settings widget from being created. Not creating the settings and controls widgets saves some resources on loading of the viewer.'),
            //     containerSettings: new Setting(undefined, typeChecks.any.name, 'optional container to use for creating settings controls, may be `undefined` in which case a DOM element whose id is domElementIdPrefix+\'-settings\' will be looked for. Set this to a falsy value different from `undefined` to prevent the settings widget from being created. Not creating the settings and controls widgets saves some resources on loading of the viewer.'),
            //     createButtons: new Setting(true, typeChecks.boolean.name, 'choose whether standard buttons will be created for the viewport'),
            //     domElementIdPrefix: new Setting('sdv-container', typeChecks.string.name, 'prefix to use for lookup of dom elements'),
            //     editMode: new Setting(false, typeChecks.boolean.name, 'choose whether the parameter controls should be initialized in edit mode'),
            //     exportModal: new Setting(true, typeChecks.boolean.name, 'choose whether a modal dialog for export handling shall be instantiated'),
            //     showControlsButton: new Setting(true, typeChecks.boolean.name, 'choose whether a button for showing/hiding the parameter controls shall be shown'),
            //     showControlsInitial: new Setting(false, typeChecks.boolean.name, 'choose whether the parameter controls shall be shown initially'),
            //     showSettingsButton: new Setting(true, typeChecks.boolean.name, 'choose whether a button for showing/hiding the settings controls shall be shown'),
            //     showSettingsInitial: new Setting(false, typeChecks.boolean.name, 'choose whether the settings controls shall be shown initially'),
            //     showZoomButton: new Setting(true, typeChecks.boolean.name, 'choose whether a button for zooming shall be shown'),
            //     zoomButtonResetsCamera: new Setting(false, typeChecks.boolean.name, 'choose whether the zoom button shall reset the camera to its default position'),
            //     showFullscreenButton: new Setting(true, typeChecks.boolean.name, 'choose whether a button for to/from fullscreen mode shall be shown'),
            //     showInitialSpinner: new Setting(true, typeChecks.boolean.name, 'choose whether an initial loading spinner shall be shown'),
            //     showBusySpinner: new Setting(true, typeChecks.boolean.name, 'choose whether a busy mode spinner or the optional custom busyGraphic shall be shown'),
            //     viewportOverlays: new Setting(true, typeChecks.boolean.name, 'choose whether viewport overlays will be created at all (buttons, spinners, progress bar)'),
            // },
            defaultMaterial: {
                // name: new Setting('Default material', typeChecks.string.name, '', false),
                // version: new Setting('2.0', typeChecks.string.name, '', false),
                bumpAmplitude: new Setting(1, typeChecks.notnegative.name, 'Bump amplitude of the default material'),
                color: new Setting('#d3d3d3', typeChecks.string.name, 'Color of the default material'),
                metalness: new Setting(0.0, typeChecks.factor.name, 'Metalness of the default material'),
                roughness: new Setting(1.0, typeChecks.factor.name, 'Roughness of the default material'),
            },
            parameters: {
                controlOrder: new Setting([], typeChecks.stringarray.name, ''),
                controlNames: new Setting([], typeChecks.stringarray.name, ''),
                parametersHidden: new Setting([], typeChecks.stringarray.name, ''),
            },
            viewer: {
                blurSceneWhenBusy: new Setting(true, typeChecks.boolean.name, 'Blur or don\'t blur the scene while a process is busy'),
                // container: new Setting(undefined, typeChecks.any.name, 'Container to use for creating the viewport, may be undefined in which case a DOM element whose id is domElementIdPrefix+\'-viewport\' will be looked for. An array of containers may be passed to create multiple viewports. Pass an empty array to avoid creating a viewport.'),
                // deferGeometryLoading: new Setting(false, typeChecks.boolean.name, 'true: tell the CommPlugin instance created by the constructor to not load any geometry until first parameter update or refresh, false: load default geometry'),
                ignoreSuperseded: new Setting(true, typeChecks.boolean.name, 'Ignore intermediate solutions which at the time of their arrival have already been superseded by another customization request', false),
                loggingLevel: new Setting(-1, (value: number) => value >= -1 && value <=3, 'Level of log messages shown on the console, allowed values: -1 (none), 0 (error), 1 (warn), 2 (info), 3 (debug)', false),
                // commPluginRuntimeId: new Setting('CommPlugin_1', typeChecks.string.name, 'runtime id to use for the CommPlugin instance created by the constructor'),
                messageLoggingLevel: new Setting(-1, (value: number) => value >= -1 && value <=3, 'Log level to be used for logging internal messages, allowed values: -1 (none), 0 (error), 1 (warn), 2 (info), 3 (debug)', false),

                // strictMode: new Setting(false, typeChecks.boolean.name, '', false),
                showMessages: new Setting(true, typeChecks.boolean.name, 'Show or don\'t show user messages in the viewport', false),
                hasRestoredSettings: new Setting(false, typeChecks.boolean.name, 'True if settings have been restored from a settings object delivered by a CommPlugin', false),
            
                // exposeViewer: new Setting(false, typeChecks.boolean.name),
                commitParameters: new Setting(false, typeChecks.boolean.name, 'Use or don\'t commit mode for parameters'),
                commitSettings: new Setting(false, typeChecks.boolean.name, 'Use or don\'t commit mode for settings'),
                viewerRuntimeId: new Setting('', typeChecks.string.name, 'The runtime id of this viewer', false),

                scene: {
                    show: new Setting(false, typeChecks.boolean.name, 'Show / hide the scene', false),
                    // showSceneMode: new Setting(2, (value: number) => value >= 0 && value <= 3, 'when to fade in the scene: ON_SHOW(1), ON_FIRST_PLUGIN(2), ON_ALL_PLUGINS(3)'),
                    showSceneTransition: new Setting('1s', typeChecks.string.name, ''),
                    camera: {
                        autoAdjust: new Setting(false, typeChecks.boolean.name, 'Enable / disable that the camera adjusts to geometry updates'),
                        cameraMovementDuration: new Setting(800, typeChecks.notnegative.name, 'Default duration of camera movements'),
                        cameraTypes: {
                            perspective: {
                                default: new Setting({
                                    position: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3any.name, 'Default position for the perspective camera'),
                                    target: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3any.name, 'Default target for the perspective camera'),
                                }, (value: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 } }) => ( typeChecks.vector3any(value.position) && typeChecks.vector3any(value.target) ), 'Default position and target for the perspective camera'),
                                fov: new Setting(45, typeChecks.notnegative.name, 'Camera frustum vertical field of view angle, unit degree, interval [0,180]'),
                                controls: new Setting(0, (value: number) => value === 0 || value === 1, 'Set camera control type'),
                            },
                            orthographic: {
                                default: new Setting({
                                    position: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3any.name, 'Default position for the orthographic camera'),
                                    target: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3any.name, 'Default target for the orthographic camera'),
                                }, (value: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 } }) => ( typeChecks.vector3any(value.position) && typeChecks.vector3any(value.target) ), 'Default position and target for the orthographic camera'),
                            },
                            active: new Setting(0, (value: number) => value >= 0 && value <=6,  'Set camera type'),
                        },
                        controls: {
                            orbit: {
                                autoRotationSpeed: new Setting(0, typeChecks.number.name, 'Speed of autoration, can be negative, also refer to enableAutoRotation'),
                                damping: new Setting(0.1, typeChecks.notnegative.name, 'How much to damp camera movements by the user'),
                                enableAutoRotation: new Setting(false, typeChecks.boolean.name, 'Enable / disable automatic rotation of the camera, also refer to autoRotationSpeed'),
                                enableKeyPan: new Setting(false, typeChecks.boolean.name, 'Enable / disable panning using the keyboard, also refer to enablePan'),
                                enablePan: new Setting(true, typeChecks.boolean.name, 'Enable / disable panning in general, also refer to enableKeyPan'),
                                enableRotation: new Setting(true, typeChecks.boolean.name, 'Enable / disable camera rotation'),
                                enableZoom: new Setting(true, typeChecks.boolean.name, 'Enable / disable zooming'),
                                input: new Setting({ keys: { up: 38, down: 40, left: 37, right: 39 }, mouse: { rotate: 0, zoom: 1, pan: 2 }, touch: { rotate: 1, zoom: 2, pan: 3 }, }, typeChecks.any.name),
                                keyPanSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of panning when using the keyboard'),
                                movementSmoothness: new Setting(0.5, typeChecks.factor.name, 'How much to the current movement is affected by the previous one'),
                                restrictions: {
                                    position: {
                                        cube: new Setting({
                                            min: new Setting({ x: -Infinity, y: -Infinity, z: -Infinity }, typeChecks.vector3any.name, 'Restriction of the camera position inside a cube, minimum corner of the cube'),
                                            max: new Setting({ x: Infinity, y: Infinity, z: Infinity }, typeChecks.vector3any.name, 'Restriction of the camera position inside a cube, maximum corner of the cube'),
                                        }, (value: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }) => ( typeChecks.vector3any(value.min) && typeChecks.vector3any(value.max) ), 'Restriction of the camera position inside a cube, minimum and maximum corner of the cube'),
                                        sphere: new Setting({
                                            center: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3any.name, 'Restriction of the camera position inside a sphere, center of the sphere'),
                                            radius: new Setting(Infinity, typeChecks.notnegative.name, 'Restriction of the camera position inside a sphere, radius of the sphere'),
                                        }, (value: { center: { x: 0, y: 0, z: 0 }, radius: number }) => ( typeChecks.vector3any(value.center) && typeChecks.notnegative(value.radius) ), 'Restriction of the camera position inside a sphere, center and radius of the sphere'),
                                    },
                                    target: {
                                        cube: new Setting({
                                            min: new Setting({ x: -Infinity, y: -Infinity, z: -Infinity }, typeChecks.vector3any.name, 'Restriction of the camera target inside a cube, minimum corner of the cube'),
                                            max: new Setting({ x: Infinity, y: Infinity, z: Infinity }, typeChecks.vector3any.name, 'Restriction of the camera target inside a cube, maximum corner of the cube'),
                                        }, (value: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }) => ( typeChecks.vector3any(value.min) && typeChecks.vector3any(value.max) ), 'Restriction of the camera target inside a cube, minimum and maximum corner of the cube'),
                                        sphere: new Setting({
                                            center: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3any.name, 'Restriction of the camera target inside a sphere, center of the sphere'),
                                            radius: new Setting(Infinity, typeChecks.notnegative.name, 'Restriction of the camera target inside a sphere, radius of the sphere'),
                                        }, (value: { center: { x: 0, y: 0, z: 0 }, radius: number }) => ( typeChecks.vector3any(value.center) && typeChecks.notnegative(value.radius) ), 'Restriction of the camera target inside a sphere, center and radius of the sphere'),
                                    },
                                    rotation: new Setting({
                                        minPolarAngle: new Setting(0, (value: number) => typeChecks.notnegative(value) && value <= 180, 'Minimum polar angle of the camera position with respect to the camera target, unit degree, interval [0,180]'),
                                        maxPolarAngle: new Setting(180, (value: number) => typeChecks.notnegative(value) && value <= 180, 'Maximum polar angle of the camera position with respect to the camera target, unit degree, interval [0,180]'),
                                        minAzimuthAngle: new Setting(-Infinity, typeChecks.number.name, 'Minimum azimuth angle of the camera position with respect to the camera target, unit degree, interval [-180,180]'),
                                        maxAzimuthAngle: new Setting(Infinity, typeChecks.number.name, 'Maximum azimuth angle of the camera position with respect to the camera target, unit degree, interval [-180,180]'),
                                    }, (value: { minPolarAngle: number, maxPolarAngle: number, minAzimuthAngle: number, maxAzimuthAngle: number }) => ( typeChecks.notnegative(value.minPolarAngle) && value.minPolarAngle <= 180 && typeChecks.notnegative(value.maxPolarAngle) && value.maxPolarAngle <= 180 && typeChecks.number(value.minAzimuthAngle) && typeChecks.number(value.maxAzimuthAngle)), 'Minimum and maximum polar and azimuth angle of the camera position with respect to the camera target, unit degree'),
                                    zoom: new Setting({
                                        minDistance: new Setting(0, typeChecks.notnegative.name, 'Minimum distance between camera position and target'),
                                        maxDistance: new Setting(Infinity, typeChecks.notnegative.name, 'Maximum distance between camera position and target'),
                                    }, (value: { minDistance: number, maxDistance: number }) => ( typeChecks.notnegative(value.minDistance) && typeChecks.notnegative(value.maxDistance) ), 'Minimum and maximum distance between camera position and target'),
                                },
                                rotationSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of camera rotation'),
                                panSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of panning'),
                                zoomSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of zooming'),
                            },
                            fps: {
                            },
                            orthographic: {
                                damping: new Setting(0.1, typeChecks.notnegative.name, 'How much to damp camera movements by the user'),
                                enableKeyPan: new Setting(false, typeChecks.boolean.name, 'Enable / disable panning using the keyboard, also refer to enablePan'),
                                enablePan: new Setting(true, typeChecks.boolean.name, 'Enable / disable panning in general, also refer to enableKeyPan'),
                                enableZoom: new Setting(true, typeChecks.boolean.name, 'Enable / disable zooming'),
                                input: new Setting({ keys: { up: 38, down: 40, left: 37, right: 39 }, mouse: { rotate: 0, zoom: 1, pan: 2 }, touch: { rotate: 1, zoom: 2, pan: 3 } }, typeChecks.any.name),
                                keyPanSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of panning when using the keyboard'),
                                movementSmoothness: new Setting(0.5, typeChecks.factor.name, 'How much to the current movement is affected by the previous one'),
                                panSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of panning'),
                                zoomSpeed: new Setting(0.5, typeChecks.factor.name, 'Speed of zooming'),
                            }
                        },
                        enableCameraControls: new Setting(true, typeChecks.boolean.name, 'Enable / disable camera controls'),
                        revertAtMouseUp: new Setting(false, typeChecks.boolean.name, 'Enable / disable if the mouse should reset on mouse up'),
                        revertAtMouseUpDuration: new Setting(800, typeChecks.notnegative.name, 'The duration of the transition of the revertAtMouseUp'),
                        zoomExtentsFactor: new Setting(1, typeChecks.number.name, 'Factor to apply to the bounding box before zooming to extents'),
                    },
                    duration: new Setting(0, typeChecks.notnegative.name, 'Set fade in / fade out duration'),
                    fullscreen: new Setting(false, typeChecks.boolean.name, 'Enable / disable fullscreen mode', false),
                    gridVisibility: new Setting(true, typeChecks.boolean.name, 'Show / hide the grid'),
                    groundPlaneReflectionThreshold: new Setting(0.01, typeChecks.notnegative.name, 'Allows to control the distance to objects that are still reflected by the groundplane'),
                    groundPlaneReflectionVisibility: new Setting(false, typeChecks.boolean.name, 'Enable / disable the reflectivity of the groundplane'),
                    groundPlaneVisibility: new Setting(true, typeChecks.boolean.name, 'Show / hide the ground plane'),
                    lights: {
                        helper: new Setting(false, typeChecks.boolean.name, 'Show / hide the light helpers'),
                        lightScene: new Setting('default', typeChecks.string.name),
                        lightScenes: new Setting({}, typeChecks.any.name),
                    },
                    material: {
                        environmentMap: new Setting('none', (value: string | String | string[] | String[]) => (typeChecks.string(value as string) || typeChecks.stringarray(value as Array<string>) && value.length === 6), 'Name of the environment map to use, or an array of 6 image URLs making up the cube mapped environment map (px, nx, pz, nz, py, ny)'),
                        environmentMapAsBackground: new Setting(false, typeChecks.boolean.name, 'Show / hide the environment map in the background'),
                        environmentMapResolution: new Setting('1024', (value: string) => (['256', '512', '1024', '2048'].includes(value)), 'Image resolution to be used for the named environment maps (available resolutions: 256, 512, 1024)'),
                    },
                    render: {
                        ambientOcclusion: new Setting(true, typeChecks.boolean.name, 'Enable / disable ambient occlusion for rendering'),
                        beautyRenderDelay: new Setting(50, typeChecks.notnegative.name, 'Amount of which the beauty rendering is delayed'),
                        clearColor: new Setting('#ffffff', typeChecks.string.name, 'Set background color'),
                        clearAlpha: new Setting(1.0, typeChecks.factor.name, 'Set background alpha value'),
                        pointSize: new Setting(1.0, typeChecks.notnegative.name, 'Set size of point objects'),
                        shadows: new Setting(true, typeChecks.boolean.name, 'Enable / disable shadows for rendering'),
                        sao: {
                            samples: new Setting(8, typeChecks.notnegative.name),
                            intensity: new Setting(0.1, typeChecks.notnegative.name),
                            kernelRadius: new Setting(8, typeChecks.notnegative.name),
                            standardDev: new Setting(25, typeChecks.notnegative.name),
                        },
                    },
                }
            },
        };
        if(settingsJSON) this._fromJSON(settingsJSON, this._settings);
    }

    // #endregion Constructors (1)

    // #region Public Methods (2)

    public convertFromPreviousVersion(settings: OldSettings): Settings {
        let oldSettings = settings.settings;
    
        (this._settings.viewer.scene.render.clearAlpha as ISetting<any>).value = oldSettings.clearAlpha.value;
        (this._settings.viewer.scene.render.clearColor as ISetting<any>).value = oldSettings.clearColor.value;
        (this._settings.defaultMaterial.color as ISetting<any>).value = oldSettings.defaultMaterialColor.value;

        (this._settings.build_date as ISetting<any>).value = oldSettings.build_date.value;
        (this._settings.build_version as ISetting<any>).value = oldSettings.build_version.value;

        if(!((oldSettings.camera as ISetting<any>).value.position.value.x === 5 && (oldSettings.camera as ISetting<any>).value.position.value.y === 5 && (oldSettings.camera as ISetting<any>).value.position.value.z === 5 && (oldSettings.camera as ISetting<any>).value.target.value.x === 0 && (oldSettings.camera as ISetting<any>).value.target.value.y === 0 && (oldSettings.camera as ISetting<any>).value.target.value.z === 0)) {
            ((this._settings.viewer.scene.camera.cameraTypes.perspective.default as ISetting<any>).value.position as ISetting<any>).value = (oldSettings.camera as ISetting<any>).value.position.value;
            ((this._settings.viewer.scene.camera.cameraTypes.perspective.default as ISetting<any>).value.target as ISetting<any>).value = (oldSettings.camera as ISetting<any>).value.target.value;    
        }

        if(!((oldSettings.cameraOrtho as ISetting<any>).value.position.value.x === 5 && (oldSettings.cameraOrtho as ISetting<any>).value.position.value.y === 5 && (oldSettings.cameraOrtho as ISetting<any>).value.position.value.z === 5 && (oldSettings.cameraOrtho as ISetting<any>).value.target.value.x === 0 && (oldSettings.cameraOrtho as ISetting<any>).value.target.value.y === 0 && (oldSettings.cameraOrtho as ISetting<any>).value.target.value.z === 0)) {
            ((this._settings.viewer.scene.camera.cameraTypes.orthographic.default as ISetting<any>).value.position as ISetting<any>).value = (oldSettings.cameraOrtho as ISetting<any>).value.position.value;
            ((this._settings.viewer.scene.camera.cameraTypes.orthographic.default as ISetting<any>).value.target as ISetting<any>).value = (oldSettings.cameraOrtho as ISetting<any>).value.target.value;        
        }

        (this._settings.viewer.scene.render.ambientOcclusion as ISetting<any>).value = oldSettings.ambientOcclusion.value;
        (this._settings.viewer.scene.camera.controls.orbit.autoRotationSpeed as ISetting<any>).value = oldSettings.autoRotateSpeed.value;
        (this._settings.defaultMaterial.bumpAmplitude as ISetting<any>).value = oldSettings.bumpAmplitude.value;
        (this._settings.viewer.scene.camera.autoAdjust as ISetting<any>).value = oldSettings.cameraAutoAdjust.value;
        (this._settings.viewer.scene.camera.cameraMovementDuration as ISetting<any>).value = oldSettings.cameraMovementDuration.value;
        (this._settings.viewer.scene.camera.revertAtMouseUp as ISetting<any>).value = oldSettings.cameraRevertAtMouseUp.value;
        (this._settings.viewer.commitParameters as ISetting<any>).value = oldSettings.commitParameters.value;
        (this._settings.viewer.scene.camera.controls.orbit.damping as ISetting<any>).value = oldSettings.controlDamping.value;
        (this._settings.viewer.scene.camera.controls.orthographic.damping as ISetting<any>).value = oldSettings.controlDamping.value;
        (this._settings.parameters.controlNames as ISetting<any>).value = oldSettings.controlNames.value;
        (this._settings.parameters.controlOrder as ISetting<any>).value = oldSettings.controlOrder.value;
        (this._settings.viewer.scene.camera.controls.orbit.enablePan as ISetting<any>).value = !oldSettings.disablePan.value;
        (this._settings.viewer.scene.camera.controls.orthographic.enablePan as ISetting<any>).value = !oldSettings.disablePan.value;
        (this._settings.viewer.scene.camera.controls.orbit.enableZoom as ISetting<any>).value = !oldSettings.disableZoom.value;
        (this._settings.viewer.scene.camera.controls.orthographic.enableZoom as ISetting<any>).value = !oldSettings.disableZoom.value;
        (this._settings.viewer.scene.camera.controls.orbit.enableAutoRotation as ISetting<any>).value = oldSettings.enableAutoRotate.value;
        (this._settings.viewer.scene.camera.controls.orbit.enableRotation as ISetting<any>).value = oldSettings.enableRotation.value;
        (this._settings.viewer.scene.material.environmentMap as ISetting<any>).value = oldSettings.environmentMap.value;
        (this._settings.viewer.scene.material.environmentMapResolution as ISetting<any>).value = oldSettings.environmentMapResolution.value;
        (this._settings.viewer.scene.camera.cameraTypes.perspective.fov as ISetting<any>).value = oldSettings.fov.value;
        (this._settings.viewer.scene.lights.lightScene as ISetting<any>).value = oldSettings.lightScene.value;
        (this._settings.viewer.scene.lights.lightScenes as ISetting<any>).value = oldSettings.lightScenes.value;
        (this._settings.parameters.parametersHidden as ISetting<any>).value = oldSettings.parametersHidden.value;
        (this._settings.viewer.scene.render.pointSize as ISetting<any>).value = oldSettings.pointSize.value;
        (this._settings.viewer.scene.camera.revertAtMouseUpDuration as ISetting<any>).value = oldSettings.revertAtMouseUpDuration.value;
        (this._settings.viewer.scene.material.environmentMapAsBackground as ISetting<any>).value = oldSettings.showEnvironmentMap.value;
        (this._settings.viewer.scene.gridVisibility as ISetting<any>).value = oldSettings.showGrid.value;
        (this._settings.viewer.scene.groundPlaneVisibility as ISetting<any>).value = oldSettings.showGroundPlane.value;
        (this._settings.viewer.scene.render.shadows as ISetting<any>).value = oldSettings.showShadows.value;
        
        // TODO: replace the '1' with the enum, as soon as build process is fixed
        if(oldSettings.topView.value)
            (this._settings.viewer.scene.camera.cameraTypes.active as ISetting<any>).value = 1;
        (this._settings.viewer.scene.camera.zoomExtentsFactor as ISetting<any>).value = oldSettings.zoomExtentFactor.value;

        return this;
    }

    public convertToPreviousVersion(): OldSettings {
        let oldSettings: OldSettings = new OldSettings();
        (oldSettings.settings.build_date as ISetting<any>).value = this._settings.build_date.value;
        (oldSettings.settings.build_version as ISetting<any>).value = this._settings.build_version.value;

        (oldSettings.settings.ambientOcclusion as ISetting<any>).value = this._settings.viewer.scene.render.ambientOcclusion.value;
        (oldSettings.settings.autoRotateSpeed as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.autoRotationSpeed.value;
        (oldSettings.settings.bumpAmplitude as ISetting<any>).value = this._settings.defaultMaterial.bumpAmplitude.value;
        (oldSettings.settings.camera as ISetting<any>).value = new Setting({
            position: this._settings.viewer.scene.camera.cameraTypes.perspective.default.value.position.value,
            target: this._settings.viewer.scene.camera.cameraTypes.perspective.default.value.target.value,
        }, (v) => true).value;
        (oldSettings.settings.cameraAutoAdjust as ISetting<any>).value = this._settings.viewer.scene.camera.autoAdjust.value;
        (oldSettings.settings.cameraMovementDuration as ISetting<any>).value = this._settings.viewer.scene.camera.cameraMovementDuration.value;
        (oldSettings.settings.cameraOrtho as ISetting<any>).value = new Setting({
            position: this._settings.viewer.scene.camera.cameraTypes.orthographic.default.value.position.value,
            target: this._settings.viewer.scene.camera.cameraTypes.orthographic.default.value.target.value,
        }, (v) => true).value;
        (oldSettings.settings.cameraRevertAtMouseUp as ISetting<any>).value = this._settings.viewer.scene.camera.revertAtMouseUp.value;
        (oldSettings.settings.clearAlpha as ISetting<any>).value = this._settings.viewer.scene.render.clearAlpha.value;
        (oldSettings.settings.clearColor as ISetting<any>).value = this._settings.viewer.scene.render.clearColor.value;
        (oldSettings.settings.commitParameters as ISetting<any>).value = this._settings.viewer.commitParameters.value;
        (oldSettings.settings.controlDamping as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.damping.value;
        (oldSettings.settings.controlNames as ISetting<any>).value = this._settings.parameters.controlNames.value;
        (oldSettings.settings.controlOrder as ISetting<any>).value = this._settings.parameters.controlOrder.value;
        (oldSettings.settings.defaultMaterialColor as ISetting<any>).value = this._settings.defaultMaterial.color.value;
        (oldSettings.settings.disablePan as ISetting<any>).value = !this._settings.viewer.scene.camera.controls.orbit.enablePan.value;
        (oldSettings.settings.disableZoom as ISetting<any>).value = !this._settings.viewer.scene.camera.controls.orbit.enableZoom.value;
        (oldSettings.settings.enableAutoRotate as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.enableAutoRotation.value;
        (oldSettings.settings.enableRotation as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.enableRotation.value;
        (oldSettings.settings.environmentMap as ISetting<any>).value = this._settings.viewer.scene.material.environmentMap.value;
        (oldSettings.settings.environmentMapResolution as ISetting<any>).value = this._settings.viewer.scene.material.environmentMapResolution.value;
        (oldSettings.settings.fov as ISetting<any>).value = this._settings.viewer.scene.camera.cameraTypes.perspective.fov.value;
        (oldSettings.settings.lightScene as ISetting<any>).value = this._settings.viewer.scene.lights.lightScene.value;
        (oldSettings.settings.lightScenes as ISetting<any>).value = this._settings.viewer.scene.lights.lightScenes.value;
        (oldSettings.settings.panSpeed as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.panSpeed.value;
        (oldSettings.settings.parametersHidden as ISetting<any>).value = this._settings.parameters.parametersHidden.value;
        (oldSettings.settings.pointSize as ISetting<any>).value = this._settings.viewer.scene.render.pointSize.value;
        (oldSettings.settings.revertAtMouseUpDuration as ISetting<any>).value = this._settings.viewer.scene.camera.revertAtMouseUpDuration.value;
        (oldSettings.settings.rotateSpeed as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.rotationSpeed.value;
        (oldSettings.settings.showEnvironmentMap as ISetting<any>).value = this._settings.viewer.scene.material.environmentMapAsBackground.value;
        (oldSettings.settings.showGrid as ISetting<any>).value = this._settings.viewer.scene.gridVisibility.value;
        (oldSettings.settings.showGroundPlane as ISetting<any>).value = this._settings.viewer.scene.groundPlaneVisibility.value;
        (oldSettings.settings.showShadows as ISetting<any>).value = this._settings.viewer.scene.render.shadows.value;
        // TODO: replace the '1' with the enum, as soon as build process is fixed
        (oldSettings.settings.topView as ISetting<any>).value = this._settings.viewer.scene.camera.cameraTypes.active.value === 1;
        (oldSettings.settings.zoomExtentFactor as ISetting<any>).value = this._settings.viewer.scene.camera.zoomExtentsFactor.value;
        (oldSettings.settings.zoomSpeed as ISetting<any>).value = this._settings.viewer.scene.camera.controls.orbit.zoomSpeed.value;

        return oldSettings;
    }

    // #endregion Public Methods (2)
};
