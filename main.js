    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");
    const card = document.getElementById("card");
    const initialCardHTML = card.innerHTML;
    const hint = document.getElementById("hint");

    let attempts = 0;
    let converted = false;
    let positioned = false;

    // initial position
    noButton.style.left = "220px";
    noButton.style.top = "260px";
    showHint();
    noButton.addEventListener("mouseenter", hoverNo);
    function hoverNo(){
        if (converted) return;
        attempts++;
        showHint();
        
        if (!positioned){
            const rect = noButton.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();

            noButton.style.position = 'absolute';
            noButton.style.left = `${rect.left - cardRect.left}px`;
            noButton.style.top = `${rect.top - cardRect.top}px`;

            positioned = true;
        }
        if (attempts >= 10){
            convertToYes();
            return;
        }

        moveButton();

    }
    function moveButton(){
        const cardRect = card.getBoundingClientRect();
        const btnRect = noButton.getBoundingClientRect();
        const currentX = btnRect.left - cardRect.left;
        const currentY = btnRect.top - cardRect.top;

        const maxAttempts = 100; // to avoid infinite loop
        const minDistance = 100; // minimum pixels to move (safe distance)
        let x, y, dx, dy, distance;

        for (let i = 0; i < maxAttempts; i++) {
            x = Math.random() * (cardRect.width - btnRect.width);
            y = Math.random() * (cardRect.height - btnRect.height);

            dx = x - currentX;
            dy = y - currentY;
            distance = Math.sqrt(dx * dx + dy * dy);

            if (distance >= minDistance) break; // enough distance, accept this move
        }
                
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }
    function showHint() {
        if(attempts === 0) hint.textContent = "I dare you to click No 🙃"
        if (attempts === 3) hint.textContent = "Don't follow this button please 😇";
        if (attempts === 7) hint.textContent = "Just click Yes already 😭";
        if (attempts === 10) hint.textContent = "There's only one right answer 😈";

    }

    function convertToYes(){
        converted = true;
        noButton.textContent = "Yes 💖";
        noButton.id = "yes";
        noButton.style.backgroundColor = "#e63946";
        noButton.style.color = "white";
        noButton.style.position = "static";
        noButton.style.marginLeft = "10px";
        noButton.style.cursor = "pointer";

        noButton.addEventListener("click",()=>{
            triggerYes();
        })
    }

    function triggerYes(){
        const card = document.getElementById("card");
        card.classList.add("success-card");
      card.innerHTML = `
   
        <h1>
        SHE SAID YESS!!! <br>
        </h1>
        <img src="images/lasky_wink.jpeg" alt="Lasky-pic" class="success-image">
        <p> Best Valentine ever hehehe ❤️</p>

        `;
        


    }
    
    yesButton.addEventListener("click",triggerYes);