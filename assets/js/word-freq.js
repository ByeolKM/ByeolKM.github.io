let text = "";

// 불용어 목록
const stopwords = [
  "the", "and", "to", "in", "of", "a", "for", "with",
  "on", "this", "that", "it", "which", "an", "from",
  "they", "by", "its", "is", "as"
];

// 차트 초기화
const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: "bar",
  data: {},
  options: {
    responsive: true
  }
});

// 차트 업데이트 함수
function updateChart() {
  text = document.getElementById('textInput').value;
  chart.data = getChartData(text);  // 여기서 chartData 객체 반환
  chart.update();
}

// Chart.js에 맞는 데이터 생성 함수
function getChartData(text, topn = 30) {
  const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];
  const frequency = {};

  words.forEach(word => {
    if (!stopwords.includes(word)) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  const sorted = Object.entries(frequency).sort(([, a], [, b]) => b - a);
  const freq_sorted = Object.fromEntries(sorted.slice(0, topn));

  return {
    labels: Object.keys(freq_sorted),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(freq_sorted)
      }
    ]
  };
}