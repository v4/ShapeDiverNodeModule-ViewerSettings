import { ISetting, IGlobalSettingsObject } from "../../interfaces/interfaces";
export interface ISettingsObject extends IGlobalSettingsObject {
    ar: {
        enableCameraSync: ISetting<boolean>;
        enableCameraSyncInitial: ISetting<boolean>;
        enableLightingEstimation: ISetting<boolean>;
        enableTouchControls: ISetting<boolean>;
        enableTouchControlRotation: ISetting<boolean>;
        enableAutomaticPlacement: ISetting<boolean>;
        defaultHitTestType: ISetting<any>;
    };
    defaultMaterial: {
        bumpAmplitude: ISetting<number>;
        color: ISetting<string>;
        metalness: ISetting<number>;
        roughness: ISetting<number>;
    };
    parameters: {
        controlOrder: ISetting<string[]>;
        controlNames: ISetting<string[]>;
        parametersHidden: ISetting<string[]>;
    };
    viewer: {
        blurSceneWhenBusy: ISetting<boolean>;
        ignoreSuperseded: ISetting<boolean>;
        loggingLevel: ISetting<number>;
        messageLoggingLevel: ISetting<number>;
        viewerRuntimeId: ISetting<string>;
        hasRestoredSettings: ISetting<boolean>;
        showMessages: ISetting<boolean>;
        commitSettings: ISetting<boolean>;
        commitParameters: ISetting<boolean>;
        scene: {
            show: ISetting<boolean>;
            showSceneTransition: ISetting<string>;
            duration: ISetting<number>;
            fullscreen: ISetting<boolean>;
            gridVisibility: ISetting<boolean>;
            groundPlaneReflectionThreshold: ISetting<number>;
            groundPlaneReflectionVisibility: ISetting<boolean>;
            groundPlaneVisibility: ISetting<boolean>;
            camera: {
                autoAdjust: ISetting<boolean>;
                cameraMovementDuration: ISetting<number>;
                cameraTypes: {
                    perspective: {
                        default: ISetting<{
                            position: ISetting<any>;
                            target: ISetting<any>;
                        }>;
                        fov: ISetting<number>;
                        controls: ISetting<number>;
                    };
                    orthographic: {
                        default: ISetting<{
                            position: ISetting<any>;
                            target: ISetting<any>;
                        }>;
                    };
                    active: ISetting<number>;
                };
                controls: {
                    orbit: {
                        autoRotationSpeed: ISetting<number>;
                        damping: ISetting<number>;
                        enableAutoRotation: ISetting<boolean>;
                        enableKeyPan: ISetting<boolean>;
                        enablePan: ISetting<boolean>;
                        enableRotation: ISetting<boolean>;
                        enableZoom: ISetting<boolean>;
                        input: ISetting<any>;
                        keyPanSpeed: ISetting<number>;
                        movementSmoothness: ISetting<number>;
                        restrictions: {
                            position: {
                                cube: ISetting<{
                                    min: ISetting<any>;
                                    max: ISetting<any>;
                                }>;
                                sphere: ISetting<{
                                    center: ISetting<any>;
                                    radius: ISetting<number>;
                                }>;
                            };
                            target: {
                                cube: ISetting<{
                                    min: ISetting<any>;
                                    max: ISetting<any>;
                                }>;
                                sphere: ISetting<{
                                    center: ISetting<any>;
                                    radius: ISetting<number>;
                                }>;
                            };
                            rotation: ISetting<{
                                minPolarAngle: ISetting<number>;
                                maxPolarAngle: ISetting<number>;
                                minAzimuthAngle: ISetting<number>;
                                maxAzimuthAngle: ISetting<number>;
                            }>;
                            zoom: ISetting<{
                                minDistance: ISetting<number>;
                                maxDistance: ISetting<number>;
                            }>;
                        };
                        rotationSpeed: ISetting<number>;
                        panSpeed: ISetting<number>;
                        zoomSpeed: ISetting<number>;
                    };
                    fps: {};
                    orthographic: {
                        damping: ISetting<number>;
                        enableKeyPan: ISetting<boolean>;
                        enablePan: ISetting<boolean>;
                        enableZoom: ISetting<boolean>;
                        input: ISetting<any>;
                        keyPanSpeed: ISetting<number>;
                        movementSmoothness: ISetting<number>;
                        panSpeed: ISetting<number>;
                        zoomSpeed: ISetting<number>;
                    };
                };
                enableCameraControls: ISetting<boolean>;
                revertAtMouseUp: ISetting<boolean>;
                revertAtMouseUpDuration: ISetting<number>;
                zoomExtentsFactor: ISetting<number>;
            };
            lights: {
                helper: ISetting<boolean>;
                lightScene: ISetting<string>;
                lightScenes: ISetting<any>;
            };
            material: {
                environmentMap: ISetting<string | string[]>;
                environmentMapAsBackground: ISetting<boolean>;
                environmentMapResolution: ISetting<string>;
            };
            render: {
                ambientOcclusion: ISetting<boolean>;
                beautyRenderDelay: ISetting<number>;
                clearAlpha: ISetting<number>;
                clearColor: ISetting<string>;
                pointSize: ISetting<number>;
                shadows: ISetting<boolean>;
                sao: {
                    samples: ISetting<number>;
                    kernelRadius: ISetting<number>;
                    intensity: ISetting<number>;
                    standardDev: ISetting<number>;
                };
            };
        };
    };
}
//# sourceMappingURL=interfaces.d.ts.map