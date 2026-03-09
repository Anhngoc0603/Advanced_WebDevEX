import { Component } from '@angular/core';

type Operation = 'max' | 'min' | 'sin' | 'cos' | 'pow';

@Component({
  selector: 'app-mathematics',
  standalone: false,
  templateUrl: './mathematics.html',
  styleUrl: './mathematics.css',
})
export class Mathematics {
  constructor() {
    // Tự động tính cos(a) khi component load xong
    setTimeout(() => this.calc('cos'), 0);
  }

  // Hàm validate input và tô đỏ nếu lỗi
  validateInputs(...inputs: (HTMLInputElement | null)[]): boolean {
    let allValid = true;

    inputs.forEach((input) => {
      if (!input) return;

      const value = input.value.trim();
      // Kiểm tra rỗng, không phải số, hoặc vô cực
      if (value === '' || isNaN(Number(value)) || !isFinite(Number(value))) {
        input.classList.add('error');
        allValid = false;
      } else {
        input.classList.remove('error');
      }
    });

    return allValid;
  }

  // Hàm tính toán chính
  calc(operation: Operation): void {
    // Lấy các element từ DOM
    const aInput = document.getElementById('a') as HTMLInputElement | null;
    const bInput = document.getElementById('b') as HTMLInputElement | null;
    const cInput = document.getElementById('c') as HTMLInputElement | null;
    const resultInput = document.getElementById('result') as HTMLInputElement | null;

    // Kiểm tra elements tồn tại
    if (!aInput || !bInput || !cInput || !resultInput) {
      console.error('Không tìm thấy một hoặc nhiều input element!');
      return;
    }

    // Xóa class error cũ
    [aInput, bInput, cInput].forEach((input) => input?.classList.remove('error'));

    let a: number | undefined;
    let b: number | undefined;
    let c: number | undefined;

    if (operation === 'max' || operation === 'min') {
      if (!this.validateInputs(aInput, bInput, cInput)) return;
      a = parseFloat(aInput.value);
      b = parseFloat(bInput.value);
      c = parseFloat(cInput.value);
    } else {
      // sin, cos, pow chỉ cần a (pow cần thêm b)
      if (!this.validateInputs(aInput)) return;
      a = parseFloat(aInput.value);

      if (operation === 'pow') {
        if (!this.validateInputs(bInput)) return;
        b = parseFloat(bInput.value);
      }
    }

    let result: number;

    switch (operation) {
      case 'max':
        if (c === undefined) return;
        result = Math.max(a, b!, c);
        break;

      case 'min':
        if (c === undefined) return;
        result = Math.min(a, b!, c);
        break;

      case 'sin':
        result = Math.sin(a * Math.PI / 180); // chuyển độ sang radian
        break;

      case 'cos':
        result = Math.cos(a * Math.PI / 180);
        break;

      case 'pow':
        result = a * a * b!; // a² × b
        break;

      default:
        result = 0;
    }

    // Hiển thị kết quả (giữ nguyên độ chính xác mặc định của JS)
    resultInput.value = result.toString();
  }
}
