import type { Opportunity } from "./types";

export type LifecycleStatus = "activa" | "por-cerrar" | "cerrada";

export interface LifecycleInfo {
  status: LifecycleStatus;
  daysLeft: number;
  label: string;
}

const DAY_MS = 1000 * 60 * 60 * 24;
const WARN_WINDOW_DAYS = 20;

/**
 * Single source of truth for the lifecycle engine described in the content
 * strategy: activa -> por-cerrar -> cerrada, computed from closingDate so
 * nothing needs manual archiving.
 */
export function getLifecycle(closingDate: string, today: Date = new Date()): LifecycleInfo {
  const closing = new Date(`${closingDate}T23:59:59`);
  const daysLeft = Math.ceil((closing.getTime() - today.getTime()) / DAY_MS);

  if (daysLeft < 0) {
    return { status: "cerrada", daysLeft, label: "Convocatoria cerrada" };
  }
  if (daysLeft <= WARN_WINDOW_DAYS) {
    return {
      status: "por-cerrar",
      daysLeft,
      label: daysLeft === 0 ? "Cierra hoy" : daysLeft === 1 ? "Cierra mañana" : `Cierra en ${daysLeft} días`,
    };
  }
  return { status: "activa", daysLeft, label: `Cierra en ${daysLeft} días` };
}

export function isActiveOrClosing(o: Opportunity, today?: Date): boolean {
  if (!o.closingDate) return true; // evergreen guides (migración) never close
  const { status } = getLifecycle(o.closingDate, today);
  return status !== "cerrada";
}

export function findSimilarActive(
  target: Opportunity,
  all: Opportunity[],
  today?: Date,
  limit = 3,
): Opportunity[] {
  return all
    .filter((o) => o.slug !== target.slug && isActiveOrClosing(o, today))
    .sort((a, b) => {
      const aScore = (a.countrySlug === target.countrySlug ? 2 : 0) + (a.category === target.category ? 1 : 0);
      const bScore = (b.countrySlug === target.countrySlug ? 2 : 0) + (b.category === target.category ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}
