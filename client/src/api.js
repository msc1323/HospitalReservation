import { doctorImagesByEmail } from "./doctorProfiles.js";

export async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      credentials: "same-origin",
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new Error("Nem érhető el a szerver. Indítsd el a .NET backendet is.");
  }
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!response.ok) {
    throw new Error(
      data?.message ||
        (response.status === 401
          ? "Jelentkezz be a folytatáshoz."
          : `Szerverhiba (${response.status}).`),
    );
  }
  return data;
}

export function doctorFromApi(item) {
  const firstName = item.psInformation?.firstName || "";
  const lastName = item.psInformation?.lastName || "";
  const qualification = item.profInformation?.qualification || "";
  const specialty = item.profInformation?.specialization || "Általános rendelés";
  const location = item.cInformationDoctor?.officeAddress || "Nincs megadva";
  const email = item.cInformationDoctor?.email || "";
  return {
    id: item.id,
    name: `${lastName} ${firstName}`.trim(),
    specialty,
    qualification,
    city: location.split(",")[0].trim(),
    location,
    hours: item.cInformationDoctor?.workingHours || "",
    image: doctorImagesByEmail[email] || `${import.meta.env.BASE_URL}images/doctor-placeholder.svg`,
    color: ["sage", "sand", "lavender"][item.id % 3],
  };
}
