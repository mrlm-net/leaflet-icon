declare const L: typeof import("leaflet");

// save these original methods before they are overwritten
const protoInitIcon = (L.Marker.prototype as unknown as RotatableMarker)._initIcon;
const protoSetPos = (L.Marker.prototype as unknown as RotatableMarker)._setPos;

L.Marker.addInitHook(function (this: RotatableMarker) {
    var iconOptions = this.options.icon && this.options.icon.options;
    var iconAnchor = iconOptions && this.options.icon?.options.iconAnchor;
    var iconAnchorStr;
    if (iconAnchor) {
        var point = L.point(iconAnchor);
        iconAnchorStr = (point.x + 'px ' + point.y + 'px');
    }
    this.options.rotationOrigin = this.options.rotationOrigin || iconAnchorStr || 'center bottom' ;
    this.options.rotationAngle = this.options.rotationAngle || 0;

    // Ensure marker keeps rotated during dragging
    this.on('drag', function(e) { e.target._applyRotation(); });
});

L.Marker.include({
    _initIcon: function() {
        protoInitIcon.call(this);
    },

    _setPos: function (pos: L.Point) {
        protoSetPos.call(this, pos);
        this._applyRotation();
    },

    _applyRotation: function () {
        if(this.options.rotationAngle) {
            this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;
            
            // Get the current transform and replace/add the rotation
            const currentTransform = this._icon.style[L.DomUtil.TRANSFORM] || '';
            const rotatePattern = /rotateZ\([^)]+\)/;
            const newRotate = 'rotateZ(' + this.options.rotationAngle + 'deg)';
            
            if (rotatePattern.test(currentTransform)) {
                this._icon.style[L.DomUtil.TRANSFORM] = currentTransform.replace(rotatePattern, newRotate);
            } else {
                this._icon.style[L.DomUtil.TRANSFORM] = currentTransform + ' ' + newRotate;
            }
        }
    },

    setRotationAngle: function(angle: number) {
        this.options.rotationAngle = angle;
        this.update();
        return this;
    },

    setRotationOrigin: function(origin: string) {
        this.options.rotationOrigin = origin;
        this.update();
        return this;
    }
});

type MarkerOptionsWithRotation = L.MarkerOptions & {
    rotationAngle?: number;
    rotationOrigin?: string;
};

interface RotatableMarker extends L.Marker {
    options: MarkerOptionsWithRotation;
    _initIcon: () => void;
    _setPos: (pos: L.Point) => void;
    _applyRotation: () => void;
    setRotationAngle: (angle: number) => this;
    setRotationOrigin: (origin: string) => this;
}

export {
    MarkerOptionsWithRotation,
    RotatableMarker
};   