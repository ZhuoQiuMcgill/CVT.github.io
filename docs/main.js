/**
 * @global
 * @var {number} zoomLevel
 * @description 当前的缩放级别。初始值为1，表示无缩放。
 */
let zoomLevel = 1;

/**
 * @global
 * @var {number} offsetX
 * @description Canvas在X轴方向上的偏移量。初始值为0。
 */
let offsetX = 0;

/**
 * @global
 * @var {number} offsetY
 * @description Canvas在Y轴方向上的偏移量。初始值为0。
 */
let offsetY = 0;

/**
 * @global
 * @var {number} pointRadius
 * @description 点的半径，用于绘制Canvas上的点。初始值为4。
 */
let pointRadius = 4;

/**
 * @global
 * @var {Object|null} importedJSONData
 * @description 用于存储导入的JSON数据。初始值为null。
 */
let importedJSONData = null;

/**
 * @global
 * @var {number} maxFrame
 * @description 最大帧数，用于动画或数据序列。初始值为10。
 */
let maxFrame = 10;

/**
 * @global
 * @var {number} maxPoint
 * @description 最大点数量，用于在Canvas上绘制点。初始值为0。
 */
let maxPoint = 0;

/**
 * @global
 * @var {number} currentFrame
 * @description 当前帧数，用于动画或数据序列。初始值为0。
 */
let currentFrame = 0;

/**
 * @global
 * @var {Object|null} currentFrameData
 * @description 当前帧的数据集。初始值为null。
 */
let currentFrameData = null;

/**
 * @global
 * @var {Object} clusterColorMap
 * @description 动态生成的cluster与颜色的映射。初始值为一个空对象。
 */
let clusterColorMap = {};

/**
 * @global
 * @var {Object|null} selectedPoint
 * @description 用于跟踪当前选中的点。初始值为null。
 */
let selectedPoint = null;

/**
 * @global
 * @var {Object|null} firstSelectedPoint
 * @description 用于跟踪第一个选中的点。初始值为null。
 */
let firstSelectedPoint = null;

/**
 * @global
 * @var {Object|null} secondSelectedPoint
 * @description 用于跟踪第二个选中的点。初始值为null。
 */
let secondSelectedPoint = null;

/**
 * @global
 * @var {Object|null} selectedPointInfo
 * @description 存储有关当前选中点的信息。初始值为null。
 */
let selectedPointInfo = null;

/**
 * @global
 * @var {Object|null} selectedCluster
 * @description 用于跟踪当前选中的cluster。初始值为null。
 */
let selectedCluster = null;

/**
 * @global
 * @var {Array} preGeneratedColors
 * @description 预生成的颜色列表。初始值为空数组。
 */
let preGeneratedColors = [];

/**
 * @global
 * @var {number|null} arrowKeyDownInterval
 * @description 用于存储setInterval的ID，以便在键盘按下事件中进行清除。初始值为null。
 */
let arrowKeyDownInterval = null;

/**
 * @global
 * @var {boolean} circleMode
 * @description 用于判断是否进入画圈模式。
 */
let circleMode = false;

/**
 * @global
 * @var {Array} circleModeFrames
 * @description 画圈模式下的帧数据。
 */
let circleModeFrames = [];

/**
 * @global
 * @var {number} currentCircleModeFrame
 * @description 画圈模式下的当前帧数。初始值为0。
 */
let currentCircleModeFrame = 0;

/**
 * @global
 * @var {number} maxCircleModeFrame
 * @description 画圈模式下的最大帧数。初始值为0。
 */
let maxCircleModeFrame = 0;


/**
 * @global
 * @var {number} circleModeRadius
 * @description 画圈模式下的半径。初始值为0。
 */
let circleModeRadius = 0;


/**
 * @global
 * @var {number} sliderRadiusValue
 * @description slider设置的半径比值。初始值为1。
 */
let sliderRadiusValue = 1;


/**
 * @global
 * @var {boolean} eraserMode
 * @description 用于判断是否进入橡皮擦模式。
 */
let eraserMode = false;


/**
 * @global
 * @var {number} eraserRadius
 * @description eraser设置的半径。初始值为20。
 */
let eraserRadius = 30;


/**
 * @var {number} currentMouseX
 * @description 当前鼠标在Canvas上的X坐标。初始值为0。
 */
let currentMouseX = 0;


/**
 * @var {number} currentMouseY
 * @description 当前鼠标在Canvas上的Y坐标。初始值为0。
 */
let currentMouseY = 0;


/**
 * @var {boolean} mouseDown
 * @description 鼠标按下的状态。true为按下，false为未按下。初始值为false。
 */
let mouseDown = false;

/**
 * @var {boolean} refPointMode
 * @description 是否处于参考点模式。在此模式下，用户可以选择参考点。初始值为false。
 */
let refPointMode = false;

/**
 * @var {Array} refPointFrames
 * @description 存储参考点所在帧的数组。空数组表示没有参考点。
 */
let refPointFrames = [];

/**
 * @var {number} currentRefFrame
 * @description 当前选定的参考点帧。初始值为0。
 */
let currentRefFrame = 0;


let isInputFocused = false;

/**
 * @global
 * @var {Object} main_canvas
 * @description Canvas元素。
 */
const main_canvas = document.getElementById('main_canvas');

/**
 * @global
 * @var {Object} ctx
 * @description Canvas的2D渲染上下文。
 */
const ctx = main_canvas.getContext('2d');


/** ====================================================================
 *  渲染相关功能
 *  ====================================================================
 * */

/**
 * @function applyCanvasTransformations
 * @description 应用Canvas的平移和缩放变换。
 *
 * 该函数首先保存当前的绘图状态，然后应用平移和缩放变换。
 * 注意：在后续的绘图操作完成后，应调用`restoreCanvasTransformations()`以恢复保存的绘图状态。
 *
 * @global
 * @example
 * applyCanvasTransformations();
 */
function applyCanvasTransformations() {
    // 保存当前的绘图状态
    ctx.save();

    // 将原点移动到Canvas的中心
    ctx.translate(main_canvas.width / 2, main_canvas.height / 2);

    // 应用缩放变换
    ctx.scale(zoomLevel, zoomLevel);

    // 将原点移回到Canvas的左上角
    ctx.translate(-main_canvas.width / 2, -main_canvas.height / 2);

    // 应用平移变换
    ctx.translate(offsetX, offsetY);
}

/**
 * @function restoreCanvasTransformations
 * @description 恢复之前保存的Canvas绘图状态。
 *
 * 该函数调用`ctx.restore()`方法来恢复最近一次通过`ctx.save()`保存的绘图状态。
 * 这样做可以撤销之前应用的所有Canvas变换（如平移、缩放等）。
 *
 * @global
 * @example
 * restoreCanvasTransformations();
 */
function restoreCanvasTransformations() {
    // 恢复之前保存的绘图状态
    ctx.restore();
}


/**
 * @function centerCanvas
 * @param {number} x - 要将画布中心定位到的x坐标。
 * @param {number} y - 要将画布中心定位到的y坐标。
 * @description 将画布的中心定位到给定的(x, y)坐标。
 */
function centerCanvas(x, y) {
    // 更新偏移量以将给定坐标设置为画布的中心
    offsetX = main_canvas.width / 2 - x;
    offsetY = main_canvas.height / 2 - y;
}

/**
 * @function centerCanvasToMassCenter
 * @description 初始化时将画布的中心定位到所有点的质量中心。
 */
function centerCanvasToMassCenter() {
    let totalX = 0;
    let totalY = 0;
    let pointCount = 0;

    // 计算所有点的坐标和
    importedJSONData.points.forEach(point => {
        totalX += point.x;
        totalY += point.y;
        pointCount++;
    });

    // 如果没有点，直接返回
    if (pointCount === 0) {
        return;
    }

    // 计算质量中心
    const massCenterX = totalX / pointCount;
    const massCenterY = totalY / pointCount;

    // 更新偏移量以将质量中心设置为画布的中心
    centerCanvas(massCenterX, massCenterY);
}

/**
 * @function centerCanvasToRefPoint
 * @description 更新页面时将画布的中心定位到参考点的中心。
 */
function centerCanvasToRefPoint() {
    // 获取当前帧的接近度数据
    const proximity = importedJSONData.frame_data[currentFrame].proximity;

    // 获取两个参考点
    let firstRefPoint = proximity.ref_points[0];
    let secondRefPoint = proximity.ref_points[1];

    // 计算参考点的中心
    const massCenterX = (firstRefPoint.x + secondRefPoint.x) / 2;
    const massCenterY = (firstRefPoint.y + secondRefPoint.y) / 2;

    // 更新偏移量以将参考点的中心设置为画布的中心
    centerCanvas(massCenterX, massCenterY);
}


/**
 * @function drawPoint
 * @description 在Canvas上绘制一个点。
 *
 * @global
 * @param {number} x - 点的X坐标。
 * @param {number} y - 点的Y坐标。
 * @param {string} [color='black'] - 点的颜色。
 * @param {number} [radius=pointRadius] - 点的半径。
 */
function drawPoint(x, y, color = 'black', radius = pointRadius) {
    // 设置填充颜色
    ctx.fillStyle = color;
    // 开始绘制路径
    ctx.beginPath();
    // 绘制圆形
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    // 填充路径
    ctx.fill();
}

/**
 * @function drawSelectedPoint
 * @description 在Canvas上绘制一个被选中的点。
 *
 * @global
 * @param {number} x - 点的X坐标。
 * @param {number} y - 点的Y坐标。
 * @param {string} [color='red'] - 点的颜色。
 * @param {number} [radius=pointRadius x 2] - 点的半径。
 */
function drawSelectedPoint(x, y, color = 'red', radius = pointRadius * 2) {
    // 设置线条颜色
    ctx.strokeStyle = color;
    // 设置线条宽度
    ctx.lineWidth = pointRadius / 4;
    // 开始绘制路径
    ctx.beginPath();
    // 绘制圆形
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    // 描绘路径
    ctx.stroke();
}


/**
 * @function renderEraser
 * @description 渲染橡皮擦在Canvas上的效果。
 *
 * 该函数在橡皮擦模式（eraserMode）下运行。它使用当前鼠标的位置和橡皮擦的半径在Canvas上画一个黑色的点，代表橡皮擦的位置。
 */
function renderEraser() {
    if (eraserMode) {
        const canvasPos = convertMouseToCanvasCoordinate(currentMouseX, currentMouseY);
        drawPoint(canvasPos.x, canvasPos.y, 'black', eraserRadius / zoomLevel);
    }
}


/**
 * @function renderAll
 * @description 渲染整个画布，包括所有的点、选定的点和其他相关信息。
 */
function renderAll() {
    // 清空画布
    clearCanvas();

    // 应用画布变换（平移、缩放等）
    applyCanvasTransformations();

    // 根据缩放级别调整点的半径
    updatePointRadius();

    // 获取当前帧的邻近性信息
    const proximity = importedJSONData.frame_data[currentFrame].proximity;
    let info_text;

    // 渲染每一个点
    importedJSONData.points.forEach(point => {
        if (point.display) {
            const {x, y} = point;
            const label = point.frames[currentFrame].label;

            // 根据点的标签（label）进行不同的渲染
            if (label === proximity.merging_clusters.first_cluster_id) {
                drawPoint(x, y, 'red', 1.5 * pointRadius);
            } else if (label === proximity.merging_clusters.second_cluster_id) {
                drawPoint(x, y, 'blue', 1.5 * pointRadius);
            } else {
                // 生成或获取点的颜色
                if (!clusterColorMap[label]) {
                    clusterColorMap[label] = generateRandomColor(label);
                }
                const color = clusterColorMap[label];

                // 如果点属于选定的簇（cluster），则用特殊的半径绘制
                if (label === selectedCluster) {
                    drawPoint(x, y, color, pointRadius * 1.5);
                } else {
                    drawPoint(x, y, color);
                }
            }

            // 如果在circleMode中
            if (circleMode) {
                if (hasPoint(x, y, circleModeFrames[currentCircleModeFrame])) {
                    drawSelectedPoint(x, y, "#eea000", circleModeRadius);
                }
            }
        }
    });


    // 绘制参考点
    const [firstRefPoint, secondRefPoint] = proximity.ref_points;
    drawSelectedPoint(firstRefPoint.x, firstRefPoint.y, '#00FF00');
    drawSelectedPoint(secondRefPoint.x, secondRefPoint.y, '#00FF00');

    // 更新页面上的信息
    info_text = proximity.info;
    document.getElementById("pointInfo").innerHTML = info_text;

    // 如果有选定的点，添加额外的信息
    if (selectedPoint) {
        if (selectedPoint.display) {
            const {x, y} = selectedPoint;
            drawSelectedPoint(x, y);
            document.getElementById("pointInfo").innerHTML = info_text + selectedPointInfo.info;
        }
    }

    if (firstSelectedPoint && secondSelectedPoint) {
        drawSelectedPoint(firstSelectedPoint.x, firstSelectedPoint.y, '#ff0e72', circleModeRadius);
        drawSelectedPoint(secondSelectedPoint.x, secondSelectedPoint.y, '#ff0e72', circleModeRadius);
    }

    renderEraser();
    updateGeneralInfo();

    // 恢复之前保存的绘图状态
    restoreCanvasTransformations();
}


/** ====================================================================
 *  碰撞箱相关功能
 *  ====================================================================
 * */

/**
 * @function convertMouseToCanvasCoords
 * @description 将鼠标坐标转换为Canvas坐标。
 *
 * 该函数接收一个鼠标事件对象、Canvas元素以及一些变换参数（偏移和缩放）。
 * 它首先获取鼠标在视口中的坐标，然后将这些坐标转换为Canvas上的坐标。
 *
 * @global
 * @param {Event} event - 鼠标事件对象。
 * @param {Object} canvasElement - Canvas元素。
 * @param {number} offsetX - X轴的偏移量。
 * @param {number} offsetY - Y轴的偏移量。
 * @param {number} zoomLevel - 缩放级别。
 *
 * @returns {Object} 包含转换后的x和y坐标的对象。
 *
 * @example
 * const coords = convertMouseToCanvasCoords(event, canvasElement, 20, 30, 1.5);
 */
function convertMouseToCanvasCoords(event, canvasElement, offsetX, offsetY, zoomLevel) {
    // 获取Canvas元素的边界信息
    const rect = canvasElement.getBoundingClientRect();

    // 计算鼠标在Canvas元素内的坐标
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 先移动到画布中心，然后进行缩放，最后再移动回去
    const scaledX = (x - canvasElement.width / 2) / zoomLevel + canvasElement.width / 2;
    const scaledY = (y - canvasElement.height / 2) / zoomLevel + canvasElement.height / 2;

    // 应用平移
    const finalX = scaledX - offsetX;
    const finalY = scaledY - offsetY;

    // 返回转换后的坐标
    return {x: finalX, y: finalY};
}

function convertMouseToCanvasCoordinate(mouseX, mouseY) {
    const scaledX = (mouseX - main_canvas.width / 2) / zoomLevel + main_canvas.width / 2;
    const scaledY = (mouseY - main_canvas.height / 2) / zoomLevel + main_canvas.height / 2;


    const finalX = scaledX - offsetX;
    const finalY = scaledY - offsetY;

    return {x: finalX, y: finalY};
}


/**
 * @function erasePoints
 * @param {Object} clickedPoint - 传入的被点击的点的坐标对象，具有x和y属性。
 * @description 在Canvas上删除点。
 *
 * 该函数遍历importedJSONData.points数组，查找与clickedPoint接近的点。如果找到这样的点，它的display属性将被设置为false，从而在接下来的渲染中不再显示。
 */
function erasePoints(clickedPoint) {
    importedJSONData.points.forEach(point => {
        if (isClickedPos(point.x, point.y, clickedPoint, eraserRadius / zoomLevel)) {
            point.display = false;
        }
    })
}


/**
 * @function isClickedPos
 * @description 判断一个点是否被点击。
 *
 * @global
 * @param {number} x - 点的X坐标。
 * @param {number} y - 点的Y坐标。
 * @param {Object} click_point - 点击点的坐标对象，包含x和y属性。
 * @param {number} [radius=pointRadius x 2] - 判断点击有效的半径。
 * @returns {boolean} 如果点与点击点之间的距离小于或等于给定的半径，则返回true。
 */
function isClickedPos(x, y, click_point, radius = pointRadius * 2) {
    // 计算点与点击点之间的距离
    const distance = Math.sqrt(Math.pow(x - click_point.x, 2) + Math.pow(y - click_point.y, 2));

    // 判断距离是否小于或等于给定的半径
    return distance <= radius;
}


/**
 * @function circleModeCalculation
 * @description 计算圆形模式下的帧数据。
 * @global
 * 使用了全局变量：currentCircleModeFrame, maxCircleModeFrame, circleModeFrames, maxPoint, importedJSONData, circleModeRadius, firstSelectedPoint, secondSelectedPoint
 */
function circleModeCalculation() {
    currentCircleModeFrame = 0;
    maxCircleModeFrame = 0;
    circleModeFrames = [];

    let newPoints = new Map(); //用于储存上一帧新增的点
    while (true) {
        let currentFramePoints = new Map();

        // 第一帧时将选中的两个点加入
        if (maxCircleModeFrame === 0) {
            addPointToMap(firstSelectedPoint.x, firstSelectedPoint.y, currentFramePoints);
            addPointToMap(secondSelectedPoint.x, secondSelectedPoint.y, currentFramePoints);
            circleModeFrames.push(currentFramePoints);

            addPointToMap(selectedPoint.x, selectedPoint.y, newPoints);
            addPointToMap(secondSelectedPoint.x, secondSelectedPoint.y, newPoints);
        } else {
            // 如果上一帧的点是所有的点，则直接退出循环
            if (circleModeFrames[maxCircleModeFrame - 1].size === maxPoint) {
                maxCircleModeFrame -= 1;
                break;
            }

            let temp = new Map(); //用于储存这一阵新增的点
            importedJSONData.points.forEach(point => {
                // 如果点存在上一帧中直接添加
                if (hasPoint(point.x, point.y, circleModeFrames[maxCircleModeFrame - 1])) {
                    addPointToMap(point.x, point.y, currentFramePoints);
                } else {
                    for (const p of newPoints.values()) {
                        // 对上一帧新增的点进行一次碰撞箱判断，如果point在碰撞箱内则就添加到Map内
                        if (isClickedPos(p.x, p.y, point, circleModeRadius) && point.display) {
                            addPointToMap(point.x, point.y, currentFramePoints);
                            addPointToMap(point.x, point.y, temp);
                        }
                    }
                }
            })

            // 如果没有新增的点，则直接退出循环
            if (temp.size === 0) {
                maxCircleModeFrame -= 1;
                break;
            }
            circleModeFrames.push(currentFramePoints);
            newPoints = temp;
        }
        maxCircleModeFrame += 1;
    }
}


/**
 * @function addPointToMap
 * @description 将点的坐标添加到给定的Map对象中。
 * @param {number} x - 点的x坐标。
 * @param {number} y - 点的y坐标。
 * @param {Map} myMap - 要添加点到的Map对象。
 */
function addPointToMap(x, y, myMap) {
    myMap.set(x + "," + y, {x: x, y: y});
}


/**
 * @function hasPoint
 * @description 检查给定的点是否存在于指定的Map对象中。
 * @param {number} x - 点的x坐标。
 * @param {number} y - 点的y坐标。
 * @param {Map} myMap - 要检查点的Map对象。
 * @returns {boolean} 点是否存在于Map中。
 */
function hasPoint(x, y, myMap) {
    return myMap.has(x + "," + y);
}


/** ====================================================================
 *  信息更新关功能
 *  ====================================================================
 * */

/**
 * @function updateSelectedPoint
 * @description 更新选中点的信息。
 *
 * 如果存在选中的点，该函数会更新selectedPointInfo变量。
 */
function updateSelectedPoint() {
    // 检查是否有选中的点
    if (selectedPoint) {
        // 更新选中点的信息
        selectedPointInfo = selectedPoint.frames[currentFrame];
    }
}

/**
 * @function updateGeneralInfo
 * @description 更新一般信息。
 *
 * 该函数会更新HTML元素以显示总帧数、总点数和选中点（如果有）的信息。
 */
function updateGeneralInfo() {
    const testResultColor = importedJSONData.frame_data[currentFrame].proximity.test_result === 1? '#7cf6a1' : '#f56262';
    let dataSet = [];
    dataSet.push({name: "Total Frames", value: maxFrame});
    dataSet.push({name: "Total Points", value: maxPoint});
    dataSet.push({name: "P1", value: ""});
    dataSet.push({name: "P2", value: ""});
    dataSet.push({name: "Point Distance", value: 0});

    // 更新选中点的信息
    if (selectedPoint) {

        dataSet[2].value = "(" + selectedPoint.x + ", " + selectedPoint.y + ")";
        if (secondSelectedPoint) {
            dataSet[3].value = "(" + secondSelectedPoint.x + ", " + secondSelectedPoint.y + ")";
            dataSet[4].value = circleModeRadius;
        } else {
            dataSet[4].value = 0;
        }

    } else {
        dataSet[2].value = "";
    }

    // 画圈模式下的显示
    if (circleMode) {
        dataSet[0].value = maxCircleModeFrame;
        dataSet[2].value = "(" + firstSelectedPoint.x + ", " + firstSelectedPoint.y + ")";
        dataSet[3].value = "(" + secondSelectedPoint.x + ", " + secondSelectedPoint.y + ")";
        dataSet[4].value = circleModeRadius;
    } else {
        dataSet[0].value = maxFrame;
    }
    document.getElementById("generalInfoTable").innerHTML = dataSetToHtml(dataSet, testResultColor, testResultColor);

}


/**
 * @function updatePointRadius
 * @description 根据当前的缩放级别更新点的半径。
 *
 * 该函数使用全局变量 `importedJSONData` 和 `zoomLevel` 来计算新的点半径。
 * 新的点半径将存储在全局变量 `pointRadius` 中。
 *
 * @global
 * @example
 * updatePointRadius();
 */
function updatePointRadius() {
    pointRadius = (importedJSONData.point_radius / zoomLevel) * sliderRadiusValue;
}


function updateButtonColor() {
    const refModeButton = document.getElementById("ref-mode");
    if (refPointMode) {
        refModeButton.style.backgroundColor = 'red';
        refModeButton.innerHTML = 'Exit';
        document.getElementById("main_canvas").style.borderColor = "#ffd343";
    } else {
        refModeButton.style.backgroundColor = '#007bff';
        refModeButton.innerHTML = 'Ref Mode';
        document.getElementById("main_canvas").style.borderColor = "#ccc";
    }

    const circleModeButton = document.getElementById("circle-mode");
    if (circleMode) {
        circleModeButton.style.backgroundColor = 'red';
        circleModeButton.innerHTML = 'Exit';

        document.getElementById("main_canvas").style.borderColor = "#ff0000";
    } else {
        if (selectedPoint && secondSelectedPoint && !eraserMode) {
            circleModeButton.style.backgroundColor = 'green';
            document.getElementById("circle-radius").style.display = 'block';
            document.getElementById("circle-radius").value = circleModeRadius.toFixed(2);
        } else {
            circleModeButton.style.backgroundColor = '#007bff';
            document.getElementById("circle-radius").style.display = 'none';
        }
        circleModeButton.innerHTML = 'Circle Mode';

        if (!refPointMode) {
            document.getElementById("main_canvas").style.borderColor = "#ccc";
        }
    }

    if (!eraserMode) {
        document.getElementById("eraser-mode").style.backgroundColor = "#007bff";
    } else {
        document.getElementById("eraser-mode").style.backgroundColor = "#036727";
    }
}

/**
 * @function selectRefFrame
 * @description 选择与当前选定点（selectedPoint）相关联的参考帧。
 *
 * 该函数遍历所有帧，通过调用`isClickedPos`函数来确定与选定点（selectedPoint）有关的参考点。然后将这些参考帧的索引储存到`refPointFrames`数组中。
 *
 * @returns {boolean} 如果找到与selectedPoint相关的参考帧则返回true，否则返回false。
 */
function selectRefFrame() {
    if (!selectedPoint) {
        return false;
    }

    if (!selectedPoint.display) {
        return false;
    }

    refPointFrames = [];
    for (let i = 0; i < maxFrame; i++) {
        const proximity = importedJSONData.frame_data[i].proximity;
        const ref1 = proximity.ref_points[0];
        const ref2 = proximity.ref_points[1];

        if (isClickedPos(selectedPoint.x, selectedPoint.y, ref1, pointRadius) ||
            isClickedPos(selectedPoint.x, selectedPoint.y, ref2, pointRadius)) {
            refPointFrames.push(i);
        }
    }

    return refPointFrames.length !== 0;
}

/** ====================================================================
 *  canvas交互相关功能
 *  ====================================================================
 * */
/**
 * @event mousedown
 * @description 当在main_canvas上按下鼠标按钮时触发。
 *
 * 该事件监听器处理鼠标点击事件，用于选择点和更新相关信息。
 */
main_canvas.addEventListener('mousedown', function (event) {
    // 将鼠标按下
    mouseDown = true;

    // 转换鼠标坐标到Canvas坐标系
    const {x, y} = convertMouseToCanvasCoords(event, main_canvas, offsetX, offsetY, zoomLevel);
    const clickedPoint = {x, y};

    // 从导入的JSON数据中获取点
    let json_points = importedJSONData.points;


    if (eraserMode) {
        erasePoints(clickedPoint);
    } else {
        // 查找是否有现有的点被点击
        const existingPoint = json_points.find(point => isClickedPos(point.x, point.y, clickedPoint) && point.display);

        // 如果找到了被点击的现有点
        if (existingPoint) {
            if (selectedPoint && event.ctrlKey && !circleMode) {
                firstSelectedPoint = selectedPoint;
                secondSelectedPoint = existingPoint;
                circleModeRadius = Math.sqrt((selectedPoint.x - existingPoint.x) ** 2
                    + (selectedPoint.y - existingPoint.y) ** 2);
            } else {
                // 设置选中的点和其在当前帧的信息
                selectedPoint = existingPoint;
                if (!circleMode) {
                    firstSelectedPoint = selectedPoint;
                    secondSelectedPoint = null;
                }
                selectedPointInfo = selectedPoint.frames[currentFrame];

                // 如果按下了Shift键，则设置选中的簇
                if (event.shiftKey) {
                    selectedCluster = selectedPointInfo.label;
                }
            }
        } else {
            // 如果没有点被点击，清除选中的簇和点
            selectedCluster = null;
            selectedPoint = null;
            selectedPointInfo = null;

            if (!circleMode) {
                firstSelectedPoint = null;
                secondSelectedPoint = null;
                circleModeRadius = 0;
            }

        }
    }


    // 更新一般信息和重新渲染
    updateButtonColor();
    updateGeneralInfo();
    renderAll();
});


/**
 * @event mouseup
 * @description 当在main_canvas上释放鼠标按钮时触发。
 *
 * 该事件监听器处理鼠标释放事件，用于更新`mouseDown`变量的状态。
 */
main_canvas.addEventListener('mouseup', function (event) {
    mouseDown = false;
});


/**
 * @event mousemove
 * @description 当鼠标在main_canvas上移动时触发。
 *
 * 该事件监听器处理鼠标移动事件，主要在橡皮擦模式（eraserMode）下运行。它获取鼠标的当前位置，并在按下鼠标（mouseDown=true）的情况下擦除点。
 */
main_canvas.addEventListener("mousemove", function (event) {
    if (eraserMode) {
        // 获取鼠标在canvas内的坐标
        const rect = main_canvas.getBoundingClientRect();
        currentMouseX = event.clientX - rect.left;
        currentMouseY = event.clientY - rect.top;

        if (mouseDown) {
            const mousePos = convertMouseToCanvasCoords(event, main_canvas, offsetX, offsetY, zoomLevel);
            erasePoints(mousePos);
        }


        renderAll();
    }
});


/**
 * @event wheel
 * @description 当在main_canvas上滚动鼠标滚轮时触发。
 *
 * 该事件监听器处理鼠标滚轮事件，用于缩放Canvas。
 */
main_canvas.addEventListener('wheel', function (event) {
    // 阻止默认的滚动行为
    event.preventDefault();

    // 更新缩放级别
    if (event.deltaY < 0) {
        zoomLevel *= 1.1;
    } else {
        zoomLevel /= 1.1;
    }

    // 重新绘制所有内容
    renderAll();
});

/**
 * @event keydown
 * @description 当在文档上按下键盘按钮时触发。
 *
 * 该事件监听器处理键盘按键事件，用于移动Canvas的视图。
 */
document.addEventListener('keydown', function (event) {
    // 定义移动步长，该值可以根据需要进行调整
    const step = 20 / zoomLevel;

    // 根据按下的键来移动视图
    switch (event.key.toLowerCase()) {
        case 'w':
            offsetY += step;
            break;
        case 'a':
            offsetX += step;
            break;
        case 's':
            offsetY -= step;
            break;
        case 'd':
            offsetX -= step;
            break;
        default:
            return;  // 如果按下的不是WASD键，不执行任何操作
    }

    // 重新绘制所有内容
    renderAll();
});


/** ====================================================================
 *  按钮相关功能
 *  ====================================================================
 * */


/**
 * @event radiusSlider#input
 * @description 监听"radiusSlider"元素的输入事件，并更新相关的全局变量和UI。
 * @global
 * 使用了全局变量：sliderRadiusValue
 */
document.getElementById("radiusSlider").addEventListener("input", function () {
    const sliderElement = document.getElementById("radiusSlider");
    const valueElement = document.getElementById("radiusValue");
    const sliderValue = parseInt(sliderElement.value, 10);  // 转换为整数
    let actualValue;

    if (sliderValue === 50) {
        actualValue = 1;
    } else if (sliderValue < 50) {
        actualValue = 0.1 + (sliderValue / 50) * 0.9;
    } else {
        actualValue = 1 + (sliderValue - 50) * (20 - 1) / (100 - 50);
    }

    valueElement.textContent = actualValue.toFixed(2);  // 更新显示值
    sliderRadiusValue = actualValue;  // 更新全局变量
    console.log(actualValue);  // 输出到控制台

    renderAll();
});


document.getElementById('circle-radius').addEventListener('input', function () {
    // 获取输入框元素和其值
    const input = document.getElementById('circle-radius');

    // 限制输入值不得小于0或大于maxFrame
    if (parseInt(input.value) < 0) {
        input.value = 0;
    }
});

document.getElementById('circle-radius').addEventListener('focus', function () {
    isInputFocused = true;
});

document.getElementById('circle-radius').addEventListener('blur', function () {
    isInputFocused = false;
});


/**
 * @event circle-mode#click
 * @description 监听"circle-mode"按钮的点击事件，用于切换圆形模式。
 * @global
 * 使用了全局变量：circleMode, selectedPoint, secondSelectedPoint, circleModeFrames, currentCircleModeFrame, maxCircleModeFrame, circleModeRadius, currentFrame
 */
document.getElementById('circle-mode').addEventListener('click', function () {
    if (circleMode) {
        // 在circleMode下点击按钮将会退出circleMode并重置数据
        circleMode = false;
        selectedPoint = null;
        firstSelectedPoint = null;
        secondSelectedPoint = null;
        circleModeFrames = [];
        currentCircleModeFrame = 0;
        maxCircleModeFrame = 0;
        circleModeRadius = 0;

        document.getElementById("gotoPage").value = currentFrame;
    } else if (firstSelectedPoint && secondSelectedPoint && !eraserMode) {
        const input = document.getElementById("circle-radius");
        circleModeRadius = parseFloat(input.value);
        console.log("r = " + circleModeRadius);
        circleMode = true;
        circleModeCalculation();

        document.getElementById("gotoPage").value = currentCircleModeFrame;
    }
    updateGeneralInfo();
    updateButtonColor();
    renderAll();
});


/**
 * @event click
 * @description 当点击ID为'eraser-mode'的元素时触发。
 *
 * 该事件监听器用于切换橡皮擦模式（eraserMode）。点击按钮会改变eraserMode的状态，并更新相关的按钮颜色和信息。
 */
document.getElementById('eraser-mode').addEventListener('click', function () {
    if (!circleMode) {
        if (!eraserMode) {
            eraserMode = true;
            document.getElementById("eraser-mode").style.backgroundColor = "#036727";
        } else {
            eraserMode = false;
            document.getElementById("eraser-mode").style.backgroundColor = "#007bff";
        }
    }
    updateGeneralInfo();
    updateButtonColor();
    renderAll();
});


/**
 * @event click
 * @description 当点击ID为'ref-mode'的元素时触发。
 *
 * 该事件监听器用于切换参考点模式（refPointMode）。在非圈形模式（circleMode）下，如果有选定的参考帧，它将改变refPointMode的状态，并更新相关的输入框、帧数据和Canvas位置。
 */
document.getElementById('ref-mode').addEventListener('click', function () {
    if (!circleMode) {
        if (refPointMode) {
            refPointMode = false;
        } else if (selectRefFrame()) {
            refPointMode = true;
            currentFrame = refPointFrames[0];

            // 更新输入框的值为当前帧
            document.getElementById('gotoPage').value = currentFrame;

            // 更新当前帧的数据
            currentFrameData = importedJSONData.frame_data[currentFrame];

            // 重新定位Canvas到参考点
            centerCanvasToRefPoint();
        }
    }


    updateGeneralInfo();
    updateButtonColor();
    renderAll();
});


/**
 * @event click
 * @description 当点击ID为'restore'的元素时触发。
 *
 * 该事件监听器用于恢复所有点的显示状态。点击按钮会设置所有点的`display`属性为true，并更新相关的信息和按钮颜色。
 */
document.getElementById('restore').addEventListener('click', function () {
    importedJSONData.points.forEach(point => {
        point.display = true;
    })

    updateGeneralInfo();
    updateButtonColor();
    renderAll();
});


/**
 * @event click
 * @description 当点击清除按钮时触发。
 *
 * 该事件监听器处理点击事件，用于清除所有内容和重置变量。
 */
document.getElementById('clear').addEventListener('click', function () {
    // 调用清除函数
    clearAll();
    clearCanvas();
    console.log("Clear All!");
});

/**
 * @event input
 * @description 当在'gotoPage'输入框中输入时触发。
 *
 * 该事件监听器处理输入事件，用于限制输入框中的帧数值。
 */
document.getElementById('gotoPage').addEventListener('input', function () {
    // 获取输入框元素和其值
    const input = document.getElementById('gotoPage');

    // 限制输入值不得小于0或大于maxFrame
    if (parseInt(input.value) < 0) {
        input.value = 0;
    } else if (parseInt(input.value) > maxFrame) {
        input.value = maxFrame;
    }
});

/**
 * @event click
 * @description 当点击'goto'按钮时触发。
 *
 * 该事件监听器处理点击事件，用于跳转到指定的帧并更新相关信息。
 */
document.getElementById('goto').addEventListener('click', function () {
    // 获取输入框元素和其值
    const input = document.getElementById('gotoPage');

    if (circleMode) {
        // 设置当前帧为输入值
        currentCircleModeFrame = parseInt(input.value);

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentCircleModeFrame;

    } else {
        // 设置当前帧为输入值
        currentFrame = parseInt(input.value);

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentFrame;

        // 更新当前帧的数据
        currentFrameData = importedJSONData.frame_data[currentFrame];

        // 重新定位Canvas到参考点
        centerCanvasToRefPoint();
    }

    // 更新选中点的信息
    updateSelectedPoint();

    // 重新绘制所有内容
    renderAll();
});

/**
 * @function executePrevFunction
 * @description 跳转到前一帧并更新相关内容。
 * 该函数会减少当前帧数，更新输入框的值，重新定位Canvas到参考点，
 * 更新选中点的信息，并重新绘制所有内容。
 */
function executePrevFunction() {
    if (circleMode) {
        // 跳转到前一帧
        currentCircleModeFrame -= 1;

        // 限制当前帧不得小于0
        if (currentCircleModeFrame < 0) {
            currentCircleModeFrame = 0;
        }

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentCircleModeFrame;

    } else if (refPointMode) {
        currentRefFrame -= 1;
        if (currentRefFrame < 0) {
            currentRefFrame = 0;
        }
        currentFrame = refPointFrames[currentRefFrame];

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentFrame;

        // 更新当前帧的数据
        currentFrameData = importedJSONData.frame_data[currentFrame];

    } else {
        // 跳转到前一帧
        currentFrame -= 1;

        // 限制当前帧不得小于0
        if (currentFrame < 0) {
            currentFrame = 0;
        }

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentFrame;

        // 更新当前帧的数据
        currentFrameData = importedJSONData.frame_data[currentFrame];

        // 重新定位Canvas到参考点
        centerCanvasToRefPoint();
    }

    // 更新选中点的信息
    updateSelectedPoint();

    // 重新绘制所有内容
    renderAll();
}

/**
 * @function executeNextFunction
 * @description 跳转到下一帧并更新相关内容。
 * 该函数会增加当前帧数，更新输入框的值，重新定位Canvas到参考点，
 * 更新选中点的信息，并重新绘制所有内容。
 */
function executeNextFunction() {
    // 跳转到下一帧
    if (circleMode) {
        currentCircleModeFrame += 1;

        // 限制当前帧不得大于maxFrame
        if (currentCircleModeFrame > maxCircleModeFrame) {
            currentCircleModeFrame = maxCircleModeFrame;
        }

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentCircleModeFrame;
    } else if (refPointMode) {
        currentRefFrame += 1;
        if (currentRefFrame >= refPointFrames.length) {
            currentRefFrame = refPointFrames.length - 1;
        }
        currentFrame = refPointFrames[currentRefFrame];

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentFrame;

        // 更新当前帧的数据
        currentFrameData = importedJSONData.frame_data[currentFrame];

    } else {
        currentFrame += 1;

        // 限制当前帧不得大于maxFrame
        if (currentFrame > maxFrame) {
            currentFrame = maxFrame;
        }

        // 更新输入框的值为当前帧
        document.getElementById('gotoPage').value = currentFrame;

        // 更新当前帧的数据
        currentFrameData = importedJSONData.frame_data[currentFrame];

        // 重新定位Canvas到参考点
        centerCanvasToRefPoint();
    }

    // 更新选中点的信息
    updateSelectedPoint();

    // 重新绘制所有内容
    renderAll();
}

// 添加'click'事件监听器到"prev"按钮
document.getElementById("prev").addEventListener('click', function () {
    executePrevFunction();
});

// 添加'click'事件监听器到"next"按钮
document.getElementById("next").addEventListener('click', function () {
    executeNextFunction();
});

/**
 * @description 监听键盘按下事件，并根据按下的键执行相应的函数。
 */
document.addEventListener('keydown', function (event) {
    const key = event.key; // 获取按下的键

    // 清除已存在的setInterval
    if (arrowKeyDownInterval !== null) {
        clearInterval(arrowKeyDownInterval);
    }

    // 如果按下的是左箭头键
    if (key === "ArrowLeft") {
        if (!isInputFocused) {
            executePrevFunction();
            arrowKeyDownInterval = setInterval(executePrevFunction, 200);
        }
    }

    // 如果按下的是右箭头键
    if (key === "ArrowRight") {
        if (!isInputFocused) {
            executeNextFunction();
            arrowKeyDownInterval = setInterval(executeNextFunction, 200);
        }
    }
});

/**
 * @description 监听键盘释放事件，并根据释放的键停止相应的setInterval。
 */
document.addEventListener('keyup', function (event) {
    const key = event.key; // 获取释放的键

    // 如果释放的是左箭头键或右箭头键，清除setInterval
    if (key === "ArrowLeft" || key === "ArrowRight") {
        clearInterval(arrowKeyDownInterval);
        arrowKeyDownInterval = null; // 重置为null
    }
});


document.getElementById('calculate').addEventListener('click', function (event) {
    let points = [];
    importedJSONData.points.forEach(point => {
        if (point.display) {
            points.push({x: point.x, y: point.y});
        }
    })

    let dataSet = calculateFrameInfo(points);
    document.getElementById('calculateInfo').innerHTML = dataSetToHtml(dataSet);
})


/** ====================================================================
 *  清除相关功能
 *  ====================================================================
 * */

/**
 * @function clearCanvas
 * @description 清除Canvas的所有内容。
 *
 * 该函数会清除Canvas上的所有绘制内容。
 */
function clearCanvas() {
    // 清除Canvas上的所有内容
    ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
}

/**
 * @function clearAll
 * @description 清除所有内容和重置变量。
 *
 * 该函数会清除所有选中的点、簇、缩放级别和其他相关变量。
 */
function clearAll() {
    // 清除选中的簇和点
    selectedCluster = null;
    selectedPoint = null;
    selectedPointInfo = null;
    firstSelectedPoint = null;
    secondSelectedPoint = null;

    // 重置缩放级别和点半径
    zoomLevel = 1;
    pointRadius = 4;
    sliderRadiusValue = 1;

    // 清除导入的JSON数据和数据缓存
    importedJSONData = null;
    currentFrameData = null;

    // 重置最大点数
    maxPoint = 0;
    maxFrame = 0;

    // 重置画圈模式相关数据
    circleMode = false;
    maxCircleModeFrame = 0;
    circleModeRadius = 0;
    circleModeFrames = [];

    // 重置橡皮擦模式
    eraserMode = false;

    // 重置ref-point模式
    refPointMode = false;
    refPointFrames = [];
    currentRefFrame = 0;

    isInputFocused = false;

    // 重置信息框内信息
    document.getElementById('generalInfoTable').innerHTML = "";
    document.getElementById('calculateInfo').innerHTML = "";
    document.getElementById('pointInfo').innerHTML = "";
    document.getElementById("main_canvas").style.borderColor = "#ccc";
    document.getElementById("radiusSlider").value = 50;
    document.getElementById("radiusValue").textContent = "1.00";


    updateButtonColor();
}


/** ====================================================================
 *  json初始化相关功能
 *  ====================================================================
 * */

/** 导入json文件 */
/**
 * @event change
 * @description 当在'jsonFileInput'文件输入框中选择文件时触发。
 *
 * 该事件监听器处理文件选择事件，用于导入JSON文件并初始化相关信息。
 */
document.getElementById('jsonFileInput').addEventListener('change', function (event) {
    // 获取选中的文件
    const file = event.target.files[0];

    // 清除所有内容和重置变量
    clearAll();

    if (file) {
        // 创建一个新的FileReader对象
        const reader = new FileReader();

        // 当文件读取完成后触发
        reader.onload = function (e) {
            try {
                // 解析JSON数据
                importedJSONData = JSON.parse(e.target.result);

                // 打印成功导入的JSON数据
                console.log("JSON data imported successfully:", importedJSONData);

                // 初始化JSON信息
                initializeJsonInfo();
            } catch (error) {
                // 打印解析JSON时的错误
                console.error("Error parsing JSON:", error);
            }
        };

        // 读取文件内容
        reader.readAsText(file);
    }
});

/**
 * @function initializeJsonInfo
 * @description 在导入JSON数据后初始化相关信息。
 *
 * 该函数会初始化clusterColorMap、maxFrame、maxPoint等变量，并更新一般信息。
 */
function initializeJsonInfo() {
    // 初始化clusterColorMap为空对象
    clusterColorMap = {};

    // 设置maxFrame和maxPoint的值
    maxFrame = importedJSONData.frame_data.length - 1;
    maxPoint = importedJSONData.points.length;

    // 设置当前帧为0
    currentFrame = 0;

    // 更新一般信息
    updateGeneralInfo();

    // 将Canvas中心定位到质心
    centerCanvasToMassCenter();

    // 初始化所有点的display参数
    importedJSONData.points.forEach(point => {
        point.display = true;
    })

    // 更新缩放级别和点半径
    zoomLevel = main_canvas.width / importedJSONData.canvas_size;
    updatePointRadius();
    renderAll();
}


/** ====================================================================
 *  颜色初始化相关功能
 *  ====================================================================
 * */
/**
 * @async
 * @function initPredefinedColors
 * @description 从'color.csv'文件中异步加载预定义的颜色列表。
 */
async function initPredefinedColors() {
    // 发起对'color.csv'的HTTP请求
    const response = await fetch('color.csv');

    // 解析响应文本
    const data = await response.text();

    // 将每一行（即每一个颜色）存储为数组元素
    preGeneratedColors = data.split('\n').map(line => line.trim());
}

// 在页面加载时初始化预定义的颜色列表
window.addEventListener('load', () => {
    initPredefinedColors();
});


/**
 * @function generateRandomColor
 * @param {number} id - 用于生成颜色的唯一标识符。
 * @returns {string} 生成的随机颜色的16进制字符串。
 * @description 使用预生成的颜色列表和给定的ID生成一个随机颜色。
 */
function generateRandomColor(id) {
    // 使用一个简单的数学运算来“跳过”一些索引
    const index = (id * 37) % preGeneratedColors.length;

    // 返回选定索引处的颜色
    return preGeneratedColors[index];
}


/** ====================================================================
 *  外部计算功能
 *  ====================================================================
 * */
function calculatePairwiseDistances(points)
{
    let distances = [];

    for (let i = 0; i < points.length; i++)
    {
        for (let j = i + 1; j < points.length; j++)
        {
            let x1 = points[i].x;
            let y1 = points[i].y;
            let x2 = points[j].x;
            let y2 = points[j].y;

            let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            distances.push({
                point1: points[i],
                point2: points[j],
                distance: distance
            });
        }
    }

    return distances;
}

function calculateFrameInfo(points)
{

    let pairwiseDistances = calculatePairwiseDistances(points);
    if (pairwiseDistances.length === 0)
    {
        return 0;
    }

    // Calculate the mean
    let sum = 0;
    for (let i = 0; i < pairwiseDistances.length; i++)
    {
        sum += pairwiseDistances[i].distance;
    }
    let mean = sum / pairwiseDistances.length;

    // Calculate the standard deviation
    let sumOfSquares = 0;
    for (let i = 0; i < pairwiseDistances.length; i++)
    {
        sumOfSquares += Math.pow(pairwiseDistances[i].distance - mean, 2);
    }
    let std = Math.sqrt(sumOfSquares / pairwiseDistances.length);

    // Calculate the normalized standard deviation
    return [
        {name: "mean"          , value: mean},
        {name: "std"           , value: std},
        {name: "normalized_std", value: (mean === 0) ? 0 : std / mean},
    ];
}





function singleDataToHtml(data, backgroundColor) {
    return "<tr style=\"background-color: " + backgroundColor + "\">" +
        "   <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px; min-width: 110px\">" + data.name + "</td>" +
        "   <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">" + data.value + "</td>" +
        "</tr>";
}

function dataSetToHtml(dataSet, firstColor='#FFFFFF', secondColor = '#DDDDDD') {
    let c = 0;
    let htmlResult = "<table style=\"font-family: arial, sans-serif; border-collapse: collapse; width: 100%;\">\n" +
        "    <tbody>"
    dataSet.forEach(data => {
        let bg_color = c % 2 === 0 ? firstColor : secondColor;
        htmlResult += singleDataToHtml(data, bg_color);
        c++;
    })
    htmlResult += "</tbody>\n" + "</table>";
    return htmlResult;
}

