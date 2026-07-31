document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const exportBtn = document.getElementById('exportBtn');
    
    sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-collapsed');
    });

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const modules = document.querySelectorAll('.module-content');
    const pageTitle = document.getElementById('current-page-title');
    const pageSubtitle = document.getElementById('current-page-subtitle');

    const moduleInfo = {
        'mod1': { title: 'Executive Revenue Dashboard', subtitle: 'Summary of overall revenue performance' },
        'mod2': { title: 'Customer Analytics', subtitle: 'Analyze customers and customer value' },
        'mod3': { title: 'Product and Channel Revenue Analysis', subtitle: 'Identify which products and channels are driving or weakening revenue' },
        'mod4': { title: 'Pricing and Discount Analysis', subtitle: 'Assess whether discounts are supporting growth or reducing profitability' },
        'mod5': { title: 'Revenue Forecasting', subtitle: 'Forecast future revenue scenarios (Pre-computed)' },
        'mod6': { title: 'Revenue Leakage and Underperformance', subtitle: 'Identify revenue gaps and missed opportunities' },
        'mod7': { title: 'Strategic Recommendations', subtitle: 'Convert statistical findings into business actions' }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            modules.forEach(m => m.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            if(moduleInfo[targetId]) {
                pageTitle.textContent = moduleInfo[targetId].title;
                pageSubtitle.textContent = moduleInfo[targetId].subtitle;
            }
        });
    });

    // Chart.js Global Config
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = "#555555";
    Chart.defaults.scale.grid.color = "rgba(0,0,0,0.05)";
    Chart.defaults.plugins.tooltip.backgroundColor = "#14213D";
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    
    const colors = {
        primary: '#14213D', accent: '#FCA311', blueLight: '#1D2D50',
        danger: '#D32F2F', warning: '#F57C00', success: '#388E3C', grey: '#E5E5E5'
    };

    const createChart = (ctxId, config) => {
        const ctx = document.getElementById(ctxId);
        if(ctx) new Chart(ctx, config);
    };

    // Render Static Dashboard
    function renderStaticDashboard() {
        // Module 1 KPIs
        document.querySelectorAll('#mod1 .metric-value')[0].textContent = '$18.11M';
        document.querySelectorAll('#mod1 .metric-value')[1].textContent = '30.4%';
        document.querySelectorAll('#mod1 .metric-value')[2].textContent = '$378.66';
        document.querySelectorAll('#mod1 .metric-value')[3].textContent = '8';

        // Module 1 Charts
        createChart('revenueCategoryChart', {
            type: 'doughnut',
            data: {
                labels: ['Electronics', 'Home & Living', 'Sports & Outdoors', 'Beauty & Personal Care', 'Apparel', 'Food & Beverage'],
                datasets: [{ data: [5643412, 4075719, 3722247, 2105648, 1628850, 937923], backgroundColor: [colors.primary, colors.accent, '#4CAF50', '#9C27B0', '#03A9F4', '#FF9800'], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
        });
        
        createChart('revenueChannelChart', {
            type: 'bar',
            data: { labels: ['Online', 'Branch', 'Direct Sales', 'Dealer', 'Partner'], datasets: [{ label: 'Revenue ($)', data: [6392188, 4492128, 2720843, 2692183, 1816457], backgroundColor: colors.primary, borderRadius: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Sales Channel' } }, y: { title: { display: true, text: 'Revenue ($)' } } } }
        });
        
        createChart('revenueBranchChart', {
            type: 'bar',
            data: { labels: ['BR01', 'BR02', 'BR03', 'BR04', 'BR05', 'BR06', 'BR07', 'BR08'], datasets: [{ label: 'Revenue ($)', data: [3250357, 2664098, 2540622, 2417565, 2165589, 1847936, 1826339, 1401291], backgroundColor: colors.accent, borderRadius: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Branch ID' } }, y: { title: { display: true, text: 'Revenue ($)' } } } }
        });
        
        createChart('revenueTrendChart', {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { label: '2024', data: [744569, 622378, 715153, 688371, 682884, 624422, 678545, 667922, 701128, 753539, 948773, 1085475], borderColor: colors.grey, tension: 0.4 },
                    { label: '2025', data: [728338, 650191, 707460, 773624, 673614, 619052, 664748, 728875, 725877, 814560, 995672, 1118619], borderColor: colors.primary, backgroundColor: 'rgba(20, 33, 61, 0.1)', fill: true, tension: 0.4 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Month' } }, y: { title: { display: true, text: 'Revenue ($)' } } } }
        });

        // Module 3: Products & Channels
        document.getElementById('top-products-body').innerHTML = `
            <tr><td>Pro Cutlery Set</td><td>$1,548,615</td><td>26.9%</td></tr>
            <tr><td>Everyday Denim Jacket</td><td>$1,067,974</td><td>27.6%</td></tr>
            <tr><td>Pro Webcam</td><td>$870,669</td><td>42.0%</td></tr>
            <tr><td>Essential Tablet Sleeve</td><td>$789,128</td><td>40.5%</td></tr>
            <tr><td>Compact Football</td><td>$760,975</td><td>22.0%</td></tr>
        `;
        document.getElementById('low-products-body').innerHTML = `
            <tr><td>Classic Jump Rope</td><td>$95,298</td><td class="text-danger">-3.0%</td></tr>
            <tr><td>Pro Protein Bar Pack</td><td>$5,860</td><td>4.1%</td></tr>
            <tr><td>Ultra Shampoo</td><td>$6,300</td><td>18.9%</td></tr>
            <tr><td>Pro Scented Candle</td><td>$30,171</td><td>19.7%</td></tr>
            <tr><td>Signature Baseball Cap</td><td>$27,472</td><td>20.5%</td></tr>
        `;

        createChart('channelComparisonChart', {
            type: 'bar',
            data: {
                labels: ['Online', 'Branch', 'Direct Sales', 'Dealer', 'Partner'],
                datasets: [
                    { label: 'Margin %', data: [28.74, 28.62, 28.82, 28.43, 28.98], type: 'line', borderColor: colors.accent, tension: 0.2, yAxisID: 'y1' },
                    { label: 'Revenue ($)', data: [6392188, 4492128, 2720843, 2692183, 1816457], backgroundColor: colors.primary, yAxisID: 'y' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Sales Channel' } }, y: { title: { display: true, text: 'Revenue ($)' } }, y1: { position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Margin (%)' } } } }
        });

        // Other Static Modules
        createChart('customerSegChart', {
            type: 'pie',
            data: { labels: ['Low Value', 'Medium Value', 'High Value'], datasets: [{ data: [651, 845, 504], backgroundColor: ['#E5E5E5', colors.blueLight, colors.primary] }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
        });
        createChart('rfmChart', {
            type: 'bar',
            data: { labels: ['Repeat Customers', 'Occasional', 'Champions', 'At Risk'], datasets: [{ label: 'Customers', data: [896, 614, 376, 114], backgroundColor: [colors.primary, colors.blueLight, colors.success, colors.danger] }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'RFM Segment' } }, y: { title: { display: true, text: 'Number of Customers' } } } }
        });
        createChart('discountDistChart', {
            type: 'bar',
            data: { labels: ['0%', '1-5%', '6-10%', '11-15%', '16-20%', '20%+'], datasets: [{ label: 'Transactions', data: [11408, 9778, 9098, 8153, 6140, 5423], backgroundColor: colors.blueLight }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Discount Band' } }, y: { title: { display: true, text: 'Transactions' } } } }
        });
        createChart('marginImpactChart', {
            type: 'bar',
            data: { labels: ['Organic', 'Campaign'], datasets: [{ label: 'Avg Margin %', data: [30.55, 21.13], backgroundColor: [colors.primary, colors.accent] }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Sales Type' } }, y: { title: { display: true, text: 'Average Margin (%)' } } } }
        });
        createChart('forecastChart', {
            type: 'line',
            data: {
                labels: ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026'],
                datasets: [
                    { label: 'Base Case ($)', data: [760765, 681960, 738941, 807935, 700594, 642208], borderColor: colors.primary, backgroundColor: 'transparent', borderWidth: 3, tension: 0.3 },
                    { label: 'Best Case ($)', data: [782302, 703497, 760478, 829472, 722131, 663745], borderColor: colors.success, borderDash: [5, 5], backgroundColor: 'transparent', borderWidth: 2, tension: 0.3 },
                    { label: 'Worst Case ($)', data: [739228, 660423, 717404, 786398, 679057, 620671], borderColor: colors.danger, borderDash: [5, 5], backgroundColor: 'transparent', borderWidth: 2, tension: 0.3 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Month' } }, y: { title: { display: true, text: 'Forecasted Revenue ($)' } } } }
        });

        document.getElementById('top-customers-body').innerHTML = `
            <tr><td>C01284</td><td>$23,400.90</td><td>Champions</td></tr>
            <tr><td>C00134</td><td>$22,750.37</td><td>Champions</td></tr>
            <tr><td>C01019</td><td>$21,665.72</td><td>Champions</td></tr>
            <tr><td>C00231</td><td>$21,269.99</td><td>Champions</td></tr>
            <tr><td>C01132</td><td>$20,894.44</td><td>Champions</td></tr>
        `;
    }

    // Initialize
    renderStaticDashboard();
});
