"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { techCatalog, techCategoryLabels } from "@/data/tech-catalog";
import { TechCard } from "@/components/tech-stack/tech-card";
import { staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { TechCategoryId } from "@/types";

const categoryIds = Object.keys(techCategoryLabels) as TechCategoryId[];

export function TechStackDashboard() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TechCategoryId | "all">("all");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return techCatalog.filter((tech) => {
      const matchesQuery =
        !q || tech.name.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "all" || tech.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<TechCategoryId, typeof techCatalog>();
    for (const id of categoryIds) {
      const items = filtered.filter((t) => t.category === id);
      if (items.length > 0) map.set(id, items);
    }
    return map;
  }, [filtered]);

  const toggleCollapse = (id: string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
        <div className="glass flex flex-1 items-center gap-2 rounded-full px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search technologies..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          data-cursor-hover
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border bg-foreground/[0.02] text-muted-foreground hover:text-foreground",
          )}
        >
          All
        </button>
        {categoryIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveCategory(id)}
            data-cursor-hover
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === id
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-foreground/[0.02] text-muted-foreground hover:text-foreground",
            )}
          >
            {techCategoryLabels[id]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No technologies match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-12 space-y-12">
          {Array.from(grouped.entries()).map(([categoryId, items]) => {
            const isCollapsed = collapsed[categoryId];
            return (
              <div key={categoryId}>
                <button
                  type="button"
                  onClick={() => toggleCollapse(categoryId)}
                  data-cursor-hover
                  className="flex w-full items-center justify-between gap-3 border-b border-border pb-3 text-left"
                >
                  <h2 className="font-heading text-xl font-semibold">
                    {techCategoryLabels[categoryId]}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({items.length})
                    </span>
                  </h2>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      !isCollapsed && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        variants={staggerContainer(0.04)}
                        initial="hidden"
                        animate="show"
                        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                      >
                        {items.map((tech) => (
                          <TechCard key={tech.id} tech={tech} />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
