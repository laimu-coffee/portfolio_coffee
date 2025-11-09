document.addEventListener("DOMContentLoaded", function() {

    // スクロール時のフェードイン処理
    const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        // IntersectionObserverをサポートしているか確認
        if ("IntersectionObserver" in window) {
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // 要素がビューポートに入ったら 'visible' クラスを追加
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // 一度表示したら監視を解除
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,       // ビューポートを基準
                rootMargin: "0px",
                threshold: 0.1    // 要素が10%見えたらトリガー
            });

            // 各要素を監視対象に追加
            fadeInElements.forEach(el => {
                observer.observe(el);
            });

        } else {
            // IntersectionObserverが使えないブラウザのためのフォールバック
            // (このサンプルでは、単純に全要素を表示)
            fadeInElements.forEach(el => {
                el.classList.add('visible');
            });
        }
    }

    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 外部リンクやボタンは除外
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // ヘッダーの高さを考慮してスクロール
                    const headerOffset = 80; // ヘッダーの高さ(px)
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

});