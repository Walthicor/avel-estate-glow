import { HOME } from "../../content/home";
import { useLocale } from "../../i18n/LocaleProvider";
import { Hero } from "./Hero";
import { BuyerPath } from "./BuyerPath";
import { FeaturedProperties } from "./FeaturedProperties";
import { Collections } from "./Collections";
import { WhyAvel } from "./WhyAvel";
import { LeadCapture } from "./LeadCapture";

export function HomePage() {
  const { locale } = useLocale();
  const content = HOME[locale];

  return (
    <>
      <Hero content={content.hero} />
      <BuyerPath content={content.path} />
      <FeaturedProperties content={content.featured} />
      <Collections content={content.collections} />
      <WhyAvel content={content.why} />
      <LeadCapture content={content.lead} />
    </>
  );
}
