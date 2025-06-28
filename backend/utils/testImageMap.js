export const getTestAsset = (test, disease) => {
  const t = test.toLowerCase();
  const d = disease.toLowerCase();

  if (t.includes("cbc")) {
    return {
      format: "pdf",
      url: "/static/tests/cbc/cbc.pdf"
    };
  }

  if (t.includes("x-ray") && d.includes("pneumonia")) {
    return {
      format: "image",
      url: "/static/tests/xray/pneumonia1.jpg"
    };
  }

  if (t.includes("urine")) {
    return {
      format: "image",
      url: "/static/tests/urine/urinalysis1.png"
    };
  }

  if (t.includes("ecg")) {
    return {
      format: "image",
      url: "/static/tests/ecg/ecg1.jpg"
    };
  }

  return null;
};
