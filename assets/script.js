function hesabla(emeliyyat) {
  // Düymədən gələn əməliyyata görə hesablayır.
  const input1 = document.getElementById("num1").value; // Birinci inputun dəyərini götürür.
  const input2 = document.getElementById("num2").value; // İkinci inputun dəyərini götürür.
  const resultInput = document.getElementById("result"); // Nəticənin yazılacağı inputu seçir.

  const n1 = parseFloat(input1); // String dəyəri ədədə çevirir.
  const n2 = parseFloat(input2); // String dəyəri ədədə çevirir.
  let netice; // Hesablanmış cavab burada saxlanılacaq.

  switch (
    emeliyyat // Gələn əməliyyat simvoluna görə uyğun hesablama edir.
  ) {
    case "+":
      netice = n1 + n2; // Toplama
      break;
    case "-":
      netice = n1 - n2; // Çıxma
      break;
    case "*":
      netice = n1 * n2; // Vurma
      break;
    case "/":
      if (n2 === 0) {
        // 0-a bölmənin qarşısını alır.
        resultInput.value = "Xəta: sifira bölmək olmaz!"; // Xəta mesajını göstərir.
        resultInput.classList.add("error"); // Xəta stili əlavə edir.
        return; // Hesablamanı dayandırır.
      }
      netice = n1 / n2; // Bölmə
      break;
  }

  // Nəticəni göstər
  resultInput.classList.remove("error"); // Əvvəlki xəta stili varsa silir.
  resultInput.value = "Nəticə: " + parseFloat(netice.toFixed(10)); // Nəticəni 10 rəqəmə qədər yuvarlaq göstərir.
}
