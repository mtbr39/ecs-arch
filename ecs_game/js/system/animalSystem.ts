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

            if (animal && position && velocity && pathfind) {
                if (animal.stateTime == 0) {
                    animal.stateTime = -1;
                    animal.state = "change";
                } else if (animal.stateTime > 0) {
                    animal.stateTime--;
                } else {
                    // stateTimeがマイナスのときは自動でchangeに変わらない
                }
                switch (animal.state) {
                    case "change":
                        const randomProbability = Math.random();
                        if (randomProbability < 0.0) {
                            animal.state = "walk";
                            animal.stateTime = 60;
                        } else if (randomProbability < 0.4) {
                            animal.state = "idle";
                            animal.stateTime = 60;
                        } else {
                            animal.state = "pathfindStart";
                        }
                        break;

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
                            animal.state = "change";
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
