import { useTranslation } from "react-i18next";

const NotFound = ({ text }: { text?: string }) => {
	const { t } = useTranslation();

	return (
		<div data-testid="not-found">{text || t("not found")}</div>
	)
};

export default NotFound;