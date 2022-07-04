const quotes = [
    {
        quote : "가장 높은 곳에 올라가려면 가장 낮은 곳부터 시작하라",
        author : "푸블릴리우스 시루스",
    },
    {
        quote : "오늘이라는 날은 두 번 다시 오지 않는다는 것을 잊지 말라.",
        author : "단테",
    },
    {
        quote : "남자란, 말하며 접근할 때는 봄이지만 결혼해 버리면 겨울이다.",
        author : "셰익스피어",
    },
    {
        quote : "탐욕은 일체를 얻고자 욕심내어서 도리어 모든 것을 잃어버린다.",
        author : "몽테뉴",
    },
    {
        quote : "물고기를 주어라. 한 끼를 먹을 것이다. 물고기 잡는 법을 가르쳐 주어라. 평생을 먹을 것이다.",
        author : "탈무드",
    },
    {
        quote : "우선 자연을 따르라. 그리고 나서 자연을 정복하라.",
        author : "베이컨",
    },
    {
        quote : "작은 도끼라도 찍고 찍으면 큰 참나무는 넘어진다. ",
        author : "세익스피어",
    },
    {
        quote : "중요한 건 당신이 어떻게 시작했는가가 아니라 어떻게 끝내는가 이다.",
        author : "앤드류 매튜스",
    },
    {
        quote : "가르치는 것은 두 번 배우는 것이다.",
        author : "주베르",
    },
    {
        quote : "가시에 찔리지 않고서는 장미꽃을 모을 수가 없다.",
        author : "필페이",
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;