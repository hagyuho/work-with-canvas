const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// 공 객체
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    speed: 0,
    angle: 0
};

// 점수
let score = 0;

// 타이머 설정
const timerElement = document.getElementById('timer');
timerElement.value = 60; // 기본값 60초
timerElement.addEventListener('change', () => {
    if (timerElement.value === 60) timerElement.value = 60;
    if (timerElement.value === 180) timerElement.value = 180;
    if (timerElement.value === 300) timerElement.value = 300;
});

// 그리기
function draw() {
    // 배경 그리기
    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 공 그리기
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    context.fillStyle = 'orange';
    context.fill();

    // 점수 그리기
    context.font = 'bold 30px sans-serif';
    context.fillStyle = 'black';
    context.textAlign = 'right';
    context.fillText(`점수: ${score}`, canvas.width - 20, 50);
}

// 공 이동
function moveBall() {
    ball.speed = 10;
    ball.x += ball.speed * Math.cos(ball.angle);
    ball.y += ball.speed * Math.sin(ball.angle);

    // 벽 충돌 검사
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.angle = Math.PI - ball.angle;
    }
    if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
        ball.angle = -ball.angle;
    }
}

let clicked = false; // 클릭 여부 변수
let startTime = null; // 클릭 시작 시간
let prevX = null; // 이전 x 좌표
let prevY = null; // 이전 y 좌표

function startAnimation() {
    if (startTime === null) {
        startTime = Date.now();
        prevX = ball.x;
        prevY = ball.y;
    }
    
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / 1000, 1); // 최대 1초까지만 진행
    
    // ball.x = prevX + ball.speed * Math.cos(ball.angle) * progress;
    // ball.y = prevY + ball.speed * Math.sin(ball.angle) * progress;
    moveBall()
    // 그리기
    draw();

    if (progress < 1) {
        // 아직 진행 중이면 다음 애니메이션 프레임 예약
        requestAnimationFrame(startAnimation);
    } else {
        // 애니메이션 종료
        ball.speed = 0;
        clicked = false;
        prevX = null;
        prevY = null;
        startTime = null;
    }
}

// 공 클릭
canvas.addEventListener('click', () => {
    if (!clicked) {
        clicked = true;
        ball.speed = 100;
        ball.angle = Math.random() * 2 * Math.PI;
        score++; // 점수 증가
        startAnimation();
    }
});

function startGame() {
    // 타이머 설정
   const timerElement = document.getElementById('timer');
    const timer = parseInt(timerElement.value);
    let remainingTime = timer;

    // 게임 루프
    const intervalId = setInterval(() => {
        // 타이머 업데이트
        timerElement.innerText = `${remainingTime--}초 남음`;

        // 그리기
        draw();

        // 게임 종료
        if (remainingTime < 0) {
            clearInterval(intervalId);
            alert(`게임 종료! 최종 점수: ${score}`);
            location.reload();
        }
    }, 1000);

}

// 게임 시작 버튼 클릭
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    // 게임 시작
    startGame();
});

// 공 이동 방향 설정
canvas.addEventListener('mousemove', (event) => {
    if (!clicked) {
        const dx = event.offsetX - ball.x;
        const dy = event.offsetY - ball.y;
        ball.angle = Math.atan2(dy, dx);
    }
})
