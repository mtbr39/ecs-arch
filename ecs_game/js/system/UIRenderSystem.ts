import { Entity } from "../entity";
import { System } from "./system";
import { PositionComponent, SizeComponent } from "../component/component";
import { ButtonComponent, UIComponent } from "../component/UIComponent";
import { RenderSystem } from "./renderSystem";

export class UIRenderSystem extends RenderSystem {

    constructor(ctx: CanvasRenderingContext2D, entities: Entity[], scaler: any) {
        super(ctx, entities, scaler);
    }

    public update() {
        this.entities.forEach((entity) => {
            const ui = entity.components["UIComponent"] as UIComponent;
            const button = entity.components["ButtonComponent"] as ButtonComponent;

            if (ui && button) {
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "black";
                this.rect(ui.x, ui.y, ui.width, ui.height, false);

                this.ctx.fillStyle = "white";
                this.ctx.font = "20px Arial";
                this.text(button.label, "black", ui.x + ui.width/2, ui.y + ui.height/2, "60px");
            }
        });
    }
}
