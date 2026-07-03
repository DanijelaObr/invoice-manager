import { Info } from 'lucide-react';
import styles from './InfoTooltip.module.css';

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => {
  return (
    <span className={styles.wrapper} tabIndex={0}>
      <Info size={15} className={styles.icon} />
      <span className={styles.tooltip} role="tooltip">
        {text}
      </span>
    </span>
  );
};

export default InfoTooltip;
