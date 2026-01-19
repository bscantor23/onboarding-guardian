"use client";

import { Button } from "@/components/ui/Button";
import { faCircleCheck, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type OnboardingResponseProps = {
  onboardingId: string;
  onBack?: () => void;
};

export function OnboardingResponse({
  onboardingId,
  onBack,
}: Readonly<OnboardingResponseProps>) {
  return (
    <div className="flex w-full items-center justify-center bg-background-light px-4 py-12 text-ink transition-colors duration-300">
      <main className="mx-auto w-full max-w-300">
        <div className="mx-auto mb-10 w-full max-w-160 text-center">
          <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FontAwesomeIcon icon={faCircleCheck} className="text-5xl" />
          </div>

          <h1 className="pb-3 text-[40px] font-extrabold text-ink">
            Solicitud Recibida
          </h1>

          <p className="text-lg font-normal text-mintText">
            Tu solicitud de apertura está siendo procesada correctamente.
            Nuestro sistema está verificando la información para garantizar tu
            seguridad.
          </p>
        </div>

        <div className="mx-auto mb-12 w-full max-w-230">
          <div className="flex flex-col items-stretch justify-start overflow-hidden rounded-xl border border-primary/5 bg-white shadow-xl shadow-primary/5  md:flex-row">
            <div
              className="relative w-full bg-cover bg-center bg-no-repeat md:w-1/3 md:aspect-auto"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #007a6c 0%, #004d44 100%)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <FontAwesomeIcon
                  icon={faShield}
                  className="text-[160px] text-white"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col items-stretch justify-center gap-4 p-6 md:p-8">
              <div>
                <p className="mb-1 text-xs font-bold text-primary uppercase">
                  Detalles de Confirmación
                </p>
                <p className="text-2xl font-extrabold text-ink ">
                  Solicitud realizada
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-primary/5 pt-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-mintText uppercase">
                    REFERENCIA
                  </p>
                  <p className="font-mono text-2xl font-bold text-primary">
                    {onboardingId}
                  </p>
                  <p className="text-xs font-normal text-gray-500">
                    Por favor, guarda este ID para tus registros.
                  </p>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
                    SOLICITADO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-160 flex-col gap-4">
          <Button
            type="button"
            onClick={onBack}
            className="h-14 w-full rounded-xl bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <span className="truncate">Volver al Formulario</span>
            <i className="fa-solid fa-rotate-left ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
