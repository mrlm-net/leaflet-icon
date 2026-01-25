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
            this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
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

interface RotatableMarker extends L.Marker {
    options: L.MarkerOptions & {
        rotationOrigin?: string;
        rotationAngle?: number;
    };
    _initIcon: () => void;
    _setPos: (pos: L.Point) => void;
    _applyRotation: () => void;
    setRotationAngle: (angle: number) => this;
    setRotationOrigin: (origin: string) => this;
}

export { 
    RotatableMarker 
};   