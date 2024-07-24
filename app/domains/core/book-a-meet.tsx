import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useTranslation } from "~/routes/$lang/route";
import { Button } from "~/ui/button";

export const ReservationBadge = () => {
  const { t } = useTranslation();
  return (
    <Button asChild variant="secondary" size="rounded">
      <motion.a
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 10, mass: 1 }}
        href="https://zcal.co/simon-boisset/meet"
      >
        <Calendar className="w-5 h-5 mr-2" />
        <span className="font-semibold">{t((l) => l.home.book_a_call)}</span>
      </motion.a>
    </Button>
  );
};
