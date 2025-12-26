
document.getElementById('downloadBtn').addEventListener('click', function(e) {
    const btn = this;
    const progressBar = document.getElementById('progressBar');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const destination = btn.getAttribute('href');

    // যদি প্রসেসিং শুরু না হয়ে থাকে
    if (!btn.classList.contains('loading')) {
        e.preventDefault(); // লিঙ্ক ওপেন হওয়া আটকানো
        btn.classList.add('loading');
        
        let progress = 0;
        const duration = 10000; // ১০ সেকেন্ড
        const intervalTime = 100; // প্রতি ০.১ সেকেন্ডে আপডেট
        const increment = 100 / (duration / intervalTime);

        const timer = setInterval(() => {
            progress += increment;
            
            if (progress <= 100) {
                progressBar.style.width = progress + '%';
                btnText.innerText = 'Processing... ' + Math.round(progress) + '%';
            } else {
                clearInterval(timer);
                btnText.innerText = 'Starting Download...';
                
                // ১ সেকেন্ড অপেক্ষা করে রিডাইরেক্ট
                setTimeout(() => {
                    window.location.href = destination;
                    
                    // রিডাইরেক্টের পর বাটন আবার আগের অবস্থায় ফিরিয়ে আনা (যদি ইউজার ব্যাক করে)
                    setTimeout(() => {
                        btn.classList.remove('loading');
                        progressBar.style.width = '0%';
                        btnText.innerText = 'Download Latest Version';
                    }, 2000);
                }, 800);
            }
        }, intervalTime);
    }
});
