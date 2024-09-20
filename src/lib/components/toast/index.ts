const createToastElement = (text: string) => {
  const div = document.createElement("div");
  div.classList.add("toast");
  div.innerHTML = text;

  return div;
}

const createCloseBtn = (toast: HTMLDivElement, timeout: NodeJS.Timeout | null) => {
  const btn = document.createElement("button");
  
  btn.classList.add("toast-close-btn");
  btn.innerHTML = `
    <span class="material-symbols-outlined">
      close
    </span>  
  `;

  btn.addEventListener("click", () => {
    if(timeout) clearTimeout(timeout);
    document.body.removeChild(toast);
  });

  toast.appendChild(btn);
}

export const createToast = (text: string, timeout?: number) => {
  const toast = createToastElement(text);
  let timeoutId: NodeJS.Timeout | null = null;

  if(timeout) {
    timeoutId = setTimeout(() => document.body.removeChild(toast), timeout);
  }

  createCloseBtn(toast, timeoutId);
  document.body.appendChild(toast);
} 