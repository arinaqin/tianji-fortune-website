class FortuneCalculator {
    constructor() {
        this.initializeEventListeners();
        this.fortuneLevels = [
            { min: 90, level: "大吉", color: "text-red-500", description: "运势极佳，天时地利人和" },
            { min: 80, level: "中吉", color: "text-orange-500", description: "运势良好，诸事顺遂" },
            { min: 70, level: "小吉", color: "text-yellow-500", description: "运势平稳，稳中有进" },
            { min: 60, level: "平", color: "text-blue-500", description: "运势一般，需要努力" },
            { min: 40, level: "小凶", color: "text-gray-500", description: "运势欠佳，宜谨慎行事" },
            { min: 20, level: "中凶", color: "text-purple-500", description: "运势不利，多加小心" },
            { min: 0, level: "大凶", color: "text-red-600", description: "运势极差，宜静不宜动" }
        ];

        this.favorableActivities = [
            "投资理财", "签约合作", "求职面试", "表白示爱", "搬家迁居",
            "开业庆典", "学习进修", "旅行出游", "拜访长辈", "购买贵重物品",
            "举办聚会", "制定计划", "健身运动", "艺术创作", "慈善捐赠",
            "祭祀祈福", "结婚嫁娶", "动土建房", "开光仪式", "求医问药"
        ];

        this.unfavorableActivities = [
            "重大决策", "借贷投资", "争执辩论", "手术治疗", "长途驾驶",
            "签署合同", "赌博投机", "熬夜加班", "情感纠纷", "搬迁办公",
            "开始新项目", "重要考试", "商务谈判", "装修施工", "冒险活动",
            "破土动工", "出远门", "开刀手术", "词讼诉讼", "安葬下葬"
        ];

        this.colors = ["朱红色", "橙黄色", "金黄色", "翠绿色", "天蓝色", "紫罗兰", "纯白色", "墨黑色", "金色", "银色"];
        this.directions = ["正东方", "正南方", "正西方", "正北方", "东南方", "西南方", "东北方", "西北方"];
        this.times = ["子时(23-1点)", "丑时(1-3点)", "寅时(3-5点)", "卯时(5-7点)", 
                     "辰时(7-9点)", "巳时(9-11点)", "午时(11-13点)", "未时(13-15点)",
                     "申时(15-17点)", "酉时(17-19点)", "戌时(19-21点)", "亥时(21-23点)"];
    }

    initializeEventListeners() {
        document.getElementById('calculateBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.calculateFortune();
        });

        document.getElementById('newCalculationBtn').addEventListener('click', () => {
            this.resetForm();
        });
    }

    calculateFortune() {
        const name = document.getElementById('userName').value.trim();
        const birthDate = document.getElementById('birthDate').value;

        if (!name || !birthDate) {
            alert('请填写完整的姓名和出生日期，这是进行玄学测算的基础要素');
            return;
        }

        // Show loading
        document.getElementById('inputForm').classList.add('hidden');
        document.getElementById('loadingDiv').classList.remove('hidden');

        // Simulate calculation delay
        setTimeout(() => {
            const fortune = this.generateFortune(name, birthDate);
            this.displayResults(name, birthDate, fortune);
        }, 2000);
    }

    generateFortune(name, birthDate) {
        // Create a pseudo-random seed based on name and date
        const seed = this.createSeed(name, birthDate);
        
        // Generate fortune score (40-95 range for realistic results)
        const baseScore = 40 + (seed % 56);
        const dateModifier = this.getDateModifier(birthDate);
        const nameModifier = this.getNameModifier(name);
        
        const totalScore = Math.min(95, Math.max(40, baseScore + dateModifier + nameModifier));

        return {
            totalScore: totalScore,
            loveScore: this.generateSubScore(seed, 1),
            wealthScore: this.generateSubScore(seed, 2),
            careerScore: this.generateSubScore(seed, 3),
            healthScore: this.generateSubScore(seed, 4),
            favorable: this.selectRandomItems(this.favorableActivities, 5, seed),
            unfavorable: this.selectRandomItems(this.unfavorableActivities, 4, seed + 1),
            luckyColor: this.colors[seed % this.colors.length],
            luckyNumber: ((seed % 9) + 1).toString(),
            luckyDirection: this.directions[seed % this.directions.length],
            luckyTime: this.times[seed % this.times.length],
            analysis: this.generateAnalysis(totalScore, name, birthDate)
        };
    }

    createSeed(name, birthDate) {
        let seed = 0;
        for (let i = 0; i < name.length; i++) {
            seed += name.charCodeAt(i);
        }
        const date = new Date(birthDate);
        seed += date.getDate() + date.getMonth() + date.getFullYear();
        return seed;
    }

    getDateModifier(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        return (dayOfYear % 21) - 10; // -10 to +10 modifier
    }

    getNameModifier(name) {
        let modifier = 0;
        for (let i = 0; i < name.length; i++) {
            modifier += name.charCodeAt(i) % 7;
        }
        return (modifier % 11) - 5; // -5 to +5 modifier
    }

    generateSubScore(seed, multiplier) {
        return Math.min(95, Math.max(40, 50 + ((seed * multiplier) % 46) - 23));
    }

    selectRandomItems(array, count, seed) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = (seed + i) % (i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    generateAnalysis(score, name, birthDate) {
        const birth = new Date(birthDate);
        const zodiacSigns = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        const zodiac = zodiacSigns[(birth.getFullYear() - 1900) % 12];
        
        // 五行属性
        const elements = ["金", "木", "水", "火", "土"];
        const element = elements[birth.getFullYear() % 5];
        
        // 星座
        const constellations = ["白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", 
                               "天秤座", "天蝎座", "射手座", "摩羯座", "水瓶座", "双鱼座"];
        const constellation = constellations[birth.getMonth()];
        
        let analysis = `根据您的姓名「${name}」和生辰八字的玄学分析：\n\n`;
        
        analysis += `【紫薇斗数解析】\n`;
        analysis += `您属${zodiac}年生人，五行属${element}，本命星座为${constellation}。从紫薇命盘来看，`;
        
        if (score >= 80) {
            analysis += `您的命宫主星力量强盛，福德宫有吉星拱照。今日天机星与太阳星呈吉相，各方面运势都呈现上升趋势。紫薇星入命，贵人运极佳，建议把握机会，积极行动。`;
        } else if (score >= 70) {
            analysis += `您的命宫格局良好，虽有小的波折，但整体运势稳中有升。天府星坐镇，财帛宫有禄存星加持，适合稳健发展。`;
        } else if (score >= 60) {
            analysis += `您的命宫平稳，需要借助外力提升运势。建议多关注人际关系，借助贵人之力化解困难。`;
        } else {
            analysis += `您的命宫今日受到煞星影响，需要格外谨慎。建议保持低调，避免冲动决策，静待时机转换。`;
        }

        analysis += `\n\n【易经八卦指引】\n`;
        analysis += `根据您的生辰推演，今日卦象显示`;
        
        if (score >= 75) {
            analysis += `"乾卦"之象，天行健，君子以自强不息。正是大展宏图的良机，宜主动出击。`;
        } else if (score >= 60) {
            analysis += `"坤卦"之象，地势坤，君子以厚德载物。宜以柔克刚，稳扎稳打。`;
        } else {
            analysis += `"艮卦"之象，山止之意。宜静观其变，待时而动。`;
        }

        analysis += `\n\n【西方星座学解读】\n`;
        analysis += `从${constellation}的角度分析，您的性格特质在今日得到不同程度的发挥。星座学认为，您的守护星今日与其他行星形成`;
        
        if (score >= 70) {
            analysis += `和谐相位，有利于发挥个人优势，在人际交往和事业发展方面都有积极影响。`;
        } else {
            analysis += `一定的挑战相位，需要更多的耐心和智慧来应对。建议多倾听内心的声音，相信直觉的指引。`;
        }

        analysis += `\n\n【综合玄学建议】\n`;
        analysis += `综合紫薇斗数、易经八卦和星座学的分析，建议您在日常生活中多关注五行调和。作为${element}命人，可通过颜色、方位、时辰的选择来增强运势。同时，保持积极的心态，相信玄学的指引，但也要结合实际情况理性判断。`;

        return analysis;
    }

    displayResults(name, birthDate, fortune) {
        // Hide loading and show results
        document.getElementById('loadingDiv').classList.add('hidden');
        document.getElementById('resultsDiv').classList.remove('hidden');

        // Display user info
        document.getElementById('resultName').textContent = name;
        document.getElementById('resultDate').textContent = `生辰八字：${birthDate}`;

        // Display fortune score with animation
        this.animateScore(fortune.totalScore);
        
        // Display fortune level
        const level = this.fortuneLevels.find(l => fortune.totalScore >= l.min);
        document.getElementById('fortuneLevel').textContent = level.level;
        document.getElementById('fortuneLevel').className = `text-2xl font-bold font-serif-chinese mb-2 ${level.color}`;
        document.getElementById('fortuneDescription').textContent = level.description;

        // Display favorable activities
        const favorableList = document.getElementById('favorableList');
        favorableList.innerHTML = '';
        fortune.favorable.forEach(activity => {
            const li = document.createElement('li');
            li.className = 'flex items-center';
            li.innerHTML = `<span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>${activity}`;
            favorableList.appendChild(li);
        });

        // Display unfavorable activities
        const unfavorableList = document.getElementById('unfavorableList');
        unfavorableList.innerHTML = '';
        fortune.unfavorable.forEach(activity => {
            const li = document.createElement('li');
            li.className = 'flex items-center';
            li.innerHTML = `<span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>${activity}`;
            unfavorableList.appendChild(li);
        });

        // Display detailed scores
        document.getElementById('loveScore').textContent = fortune.loveScore;
        document.getElementById('loveDesc').textContent = this.getScoreDescription(fortune.loveScore);
        
        document.getElementById('wealthScore').textContent = fortune.wealthScore;
        document.getElementById('wealthDesc').textContent = this.getScoreDescription(fortune.wealthScore);
        
        document.getElementById('careerScore').textContent = fortune.careerScore;
        document.getElementById('careerDesc').textContent = this.getScoreDescription(fortune.careerScore);
        
        document.getElementById('healthScore').textContent = fortune.healthScore;
        document.getElementById('healthDesc').textContent = this.getScoreDescription(fortune.healthScore);

        // Display professional analysis
        document.getElementById('professionalAnalysis').innerHTML = 
            `<p class="text-gray-700 leading-relaxed whitespace-pre-line">${fortune.analysis}</p>`;

        // Display lucky elements
        document.getElementById('luckyColor').textContent = fortune.luckyColor;
        document.getElementById('luckyNumber').textContent = fortune.luckyNumber;
        document.getElementById('luckyDirection').textContent = fortune.luckyDirection;
        document.getElementById('luckyTime').textContent = fortune.luckyTime;

        // Scroll to results
        document.getElementById('resultsDiv').scrollIntoView({ behavior: 'smooth' });
    }

    animateScore(score) {
        const scoreText = document.getElementById('scoreText');
        const scoreCircle = document.getElementById('scoreCircle');
        
        // Animate number counting
        let currentScore = 0;
        const increment = score / 50;
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= score) {
                currentScore = score;
                clearInterval(timer);
            }
            scoreText.textContent = Math.round(currentScore);
        }, 40);

        // Animate circle
        const percentage = (score / 100) * 360;
        const color = score >= 80 ? 'border-green-500' : 
                     score >= 60 ? 'border-yellow-500' : 'border-red-500';
        
        scoreCircle.className = `w-32 h-32 rounded-full border-8 ${color} absolute top-0 left-0 transform -rotate-90 transition-all duration-1000`;
        scoreCircle.style.borderImage = `conic-gradient(currentColor ${percentage}deg, transparent ${percentage}deg) 1`;
    }

    getScoreDescription(score) {
        if (score >= 80) return "运势极佳";
        if (score >= 70) return "运势良好";
        if (score >= 60) return "运势平稳";
        if (score >= 50) return "运势一般";
        return "需要注意";
    }

    resetForm() {
        document.getElementById('resultsDiv').classList.add('hidden');
        document.getElementById('inputForm').classList.remove('hidden');
        document.getElementById('userName').value = '';
        document.getElementById('birthDate').value = '';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize the fortune calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FortuneCalculator();
});