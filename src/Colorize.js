import ColorizeChecker from "./ColorizeChecker";

class Colorize {
    static SERVICE_NAME = 'colorize';
    static $inject = ['eventBus', 'modeling', ColorizeChecker.SERVICE_NAME];
    importDone = false;

    constructor(eventBus, modeling, colorizeChecker) {
        this.eventBus = eventBus;
        this.modeling = modeling;
        this.colorizeChecker = colorizeChecker;

        eventBus.on('import.done', () => this.importDone = true);
        eventBus.on('commandStack.shape.create.postExecute', (event) => {
            console.log(event);
            
            if (
                !this.importDone
                || event.context.shape.di.stroke != undefined
                || event.context.shape.di.fill != undefined
            ) {
                return;
            }
            
            if (colorizeChecker.check(event.context.shape.type)) {
                modeling.setColor(event.context.shape, {
                    fill: colorizeChecker.getFillColor(event.context.shape.type),
                    stroke: colorizeChecker.getStrokeColor(event.context.shape.type)
                });
            }
        });
    }
}

export default Colorize;