import { AnimalComponent, Component, MapComponent, PathfindComponent, PositionComponent, VelocityComponent } from "../component/component";
import { Entity } from "../entity";
import { createPointEntity } from "../makeEntity";
import { findAndConvertPath, convertPointToGridPosition, getRandomEmptyGridPosition } from "../library/pathfind";
import { System, UtilitySystem } from "./system";

export class AnimalSystem extends System {
    constructor(entities: Entity[]) {
        super(entities);
    }

    update() {
        let map: MapComponent;
        this.entities.forEach((entity) => {
            const mapComponent = entity.components.MapComponent as MapComponent;

            if (mapComponent) {
                map = mapComponent;
                return;
            }
        });

        this.entities.forEach((entity) => {
            const animal = entity.components["AnimalComponent"] as AnimalComponent;
            const position = entity.components["PositionComponent"] as PositionComponent;
            const velocity = entity.components["VelocityComponent"] as VelocityComponent;
            const pathfind = entity.components.PathfindComponent as PathfindComponent;

            if (animal && position && velocity) {
                // animal.stateTime++;
                // if (animal.stateTime > 60) {
                //     animal.stateTime = 0;
                //     animal.state = Math.random() > 0.5 ? 'walk' : 'idle';
                // }
                switch (animal.state) {
                    case "walk":
                        velocity.speedX = 1;
                        velocity.speedY = 1;
                        break;
                    case "idle":
                        velocity.speedX = 0;
                        velocity.speedY = 0;
                        break;
                    case "pathfindStart":
                        const mapCellGridSize = 10;
                        
                        const start: Point = convertPointToGridPosition(position, mapCellGridSize);
                        const goal: Point | null = getRandomEmptyGridPosition(map.grid);
                        
                        if (goal !== null) {
                            const finalResult = findAndConvertPath(map.grid, start, goal, mapCellGridSize);
                            if (finalResult !== null) {
                                pathfind.path = finalResult!;
    
                                pathfind.path.forEach((path) => {
                                    // this.entities.push(createPointEntity(path.x, path.y)) ; // Pathにしるしをつけるデバッグ
                                });
                            } else {
                                console.log("finalResultがnullです");
                            }
                        } else {
                            console.log("goalがnullです");
                        }

                        animal.state = "pathfinding";
                        break;
                    case "pathfinding":

                        if (pathfind.path.length === 0 || pathfind.achievement >= pathfind.path.length) {
                            pathfind.achievement = 0;
                            animal.state = "pathfindStart";
                        }

                        break;
                    default:
                        animal.state = "pathfindStart";
                        break;
                }
            }
        });
    }
}
