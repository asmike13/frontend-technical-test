import { useTranslation } from "react-i18next";

const NotFound = ({ text }: { text?: string }) => {
	const { t } = useTranslation();

	return (
		<div>{text || t("not found")}</div>
	)
};

export default NotFound;