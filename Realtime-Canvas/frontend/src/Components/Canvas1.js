import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './Canvas1.css';
import { BsEraserFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";

const Canvas = () => {
    const [storeImgData, setStoreImgData] = useState(['']);
    const [storeImgData1, setStoreImgData1] = useState(['']);
    const [brushColor, setBrushColor] = useState("white");
    const [brushRadius, setBrushRadius] = useState(1);
    const { current: canvasDetails } = useRef({ color: 'white', socketUrl: '/', lineWidth: 1 });
 

    const changeColor = (newColor) => {
        setBrushColor(newColor);
        canvasDetails.color = newColor;
    }
    const changeBrushSize = (newBrushSize) => {
         setBrushRadius(newBrushSize);
         canvasDetails.lineWidth = brushRadius;
    }
    const eraser = () => {
        canvasDetails.lineWidth = 10;
        canvasDetails.color = "black";
    }
    const pen = () => {
        canvasDetails.lineWidth = brushRadius;
        canvasDetails.color = brushColor;
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.globalCompositeOperation = 'source-over';
    }
    const clear = () => {
       const canvas = document.getElementById("canvas");
       const context = canvas.getContext("2d");
       context.clearRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(() => {

        canvasDetails.socketUrl = 'http://localhost:5000';
        canvasDetails.socket = io.connect(canvasDetails.socketUrl, () => {
        })

        console.log(canvasDetails);

        canvasDetails.socket.on('image-data', (data) => {
            const image = new Image()
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            image.src = data;
            image.addEventListener('load', () => {
                context.drawImage(image, 0, 0);
            });
        })

    }, []);

    useEffect(() => {
        const mouseMoveHandler = (e, type) => {
           console.log(e)
            const event = type === 'touch' ? e.touches[0] : e;
            findxy('move', event)
        }
        const mouseDownHandler = (e, type) => {
             console.log(e.touches);
            const event = type === 'touch' ? e.touches[0] : e;
            findxy('down', event);
        }
        const mouseUpHandler = (e, type) => {
            const event = type === 'touch' ? e.touches[0] : e;
            findxy('up', event)
        }

        let prevX = 0, currX = 0, prevY = 0, currY = 0, flag = false;

        const canvas = document.getElementById('canvas');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const context = canvas.getContext('2d');
        const onSave = () => {
            console.log(canvasDetails);
            if (!canvasDetails.waiting) {
                const base64EncodedUrl = canvas.toDataURL('image/png');
                // addToImgData(base64EncodedUrl);
                storeImgData.push(base64EncodedUrl);
                storeImgData1.push(base64EncodedUrl);
                canvasDetails.socket.emit('image-data', base64EncodedUrl);
                canvasDetails.waiting = true;
                setTimeout(() => {
                    canvasDetails.waiting = false;
                }, 100);
            }
        }

        const draw = (e) => {

            // START- DRAW
            context.beginPath();
            context.moveTo(prevX, prevY);
            context.lineTo(currX, currY);
            context.strokeStyle = canvasDetails.color;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.lineWidth = canvasDetails.lineWidth;
            context.stroke();
            context.closePath();
            // END- DRAW

            onSave();
        }

        const findxy = (res, e) => {
            if (res === 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                flag = true;
            }
            if (res === 'up' || res === "out") {
                flag = false;
            }
            if (res === 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - canvas.offsetLeft;
                    currY = e.clientY - canvas.offsetTop;
                    draw(e);
                }
            }
        }

        canvas.addEventListener("mousemove", mouseMoveHandler);
        canvas.addEventListener("mousedown", mouseDownHandler);
        canvas.addEventListener("mouseup", mouseUpHandler);
        canvas.addEventListener("touchmove", (e) => mouseMoveHandler(e, 'touch'), { passive: true });
        canvas.addEventListener("touchstart", (e) => mouseDownHandler(e, 'touch'), { passive: true });
        canvas.addEventListener("touchend", (e) => mouseUpHandler(e, 'touch'));
      
    }, [])

    return (
        <>
            <div className='blackboard'>
                <figure className="frame">
                    <div className='color-picker-wrapper'>
                        <input
                            className='color-picker'
                            type='color'
                            defaultValue='#EFEFEF'
                            onChange={(e) => changeColor(e.target.value)}
                        />
                        <input
                            min="2"
                            max="50"
                            type="range"
                            value={brushRadius}
                            onChange={(event) => {
                                changeBrushSize(parseInt(event.target.value));
                            }}
                        />
                        <span>{brushRadius}</span>
                    </div>
                    <canvas className='canvas' id='canvas'></canvas>
                </figure>
                <div className='button-wrapper'>
                    <button className="btn"
                        onClick={(e) => {
                            eraser()
                        }}><BsEraserFill size={14} /></button>
                    <button className="btn"
                        onClick={(e) => {
                            pen()
                        }}><BsFillPencilFill size={14} /></button>
                    <button className="btn"
                        onClick={(e) => {
                            clear()
                        }}><AiOutlineClear size={14} /></button>
                 
                </div>
            </div>
        </>
    )

}

export default Canvas