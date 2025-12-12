import React, { useState, useEffect } from 'react';
import { currencyService } from '../../services/currencyService';

interface CurrencyDisplayProps {
  ethAmount?: number;
  nairaAmount?: number;
  showBoth?: boolean;
  className?: string;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  ethAmount,
  nairaAmount,
  showBoth = false,
  className = ''
}) => {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const convert = async () => {
      if ((!ethAmount || ethAmount <= 0) && (!nairaAmount || nairaAmount <= 0)) {
        setConvertedAmount(null);
        return;
      }
      
      setLoading(true);
      try {
        if (ethAmount && ethAmount > 0 && !nairaAmount) {
          const ngn = await currencyService.quickConvertEthToNgn(ethAmount);
          setConvertedAmount(ngn);
        } else if (nairaAmount && nairaAmount > 0 && !ethAmount) {
          const eth = await currencyService.quickConvertNgnToEth(nairaAmount);
          setConvertedAmount(eth);
        } else if (ethAmount && nairaAmount) {
          // Both provided, use ETH as primary
          const ngn = await currencyService.quickConvertEthToNgn(ethAmount);
          setConvertedAmount(ngn);
        }
      } catch (error) {
        console.error('Currency conversion failed:', error);
        setConvertedAmount(null);
      } finally {
        setLoading(false);
      }
    };

    convert();
  }, [ethAmount, nairaAmount]);

  if (loading) {
    return <span className={`animate-pulse ${className}`}>Converting...</span>;
  }

  if (showBoth) {
    const displayNaira = nairaAmount || convertedAmount;
    const displayEth = ethAmount || (nairaAmount ? convertedAmount : 0);
    
    return (
      <div className={className}>
        <div className="text-sm font-semibold text-green-600">
          {displayNaira ? currencyService.formatNaira(displayNaira) : '₦0'}
        </div>
        <div className="text-xs text-gray-500">
          {displayEth ? currencyService.formatEth(displayEth) : '0.000000 ETH'}
        </div>
      </div>
    );
  }

  if (ethAmount && convertedAmount) {
    return (
      <span className={`text-green-600 font-semibold ${className}`}>
        {currencyService.formatNaira(convertedAmount)}
      </span>
    );
  }

  if (nairaAmount) {
    return (
      <span className={`text-green-600 font-semibold ${className}`}>
        {currencyService.formatNaira(nairaAmount)}
      </span>
    );
  }

  return null;
};

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  currency: 'NGN' | 'ETH';
  placeholder?: string;
  className?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  currency,
  placeholder,
  className = ''
}) => {
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  useEffect(() => {
    const convert = async () => {
      if (!value) {
        setConvertedValue(null);
        return;
      }

      try {
        if (currency === 'NGN') {
          const eth = await currencyService.quickConvertNgnToEth(value);
          setConvertedValue(eth);
        } else {
          const ngn = await currencyService.quickConvertEthToNgn(value);
          setConvertedValue(ngn);
        }
      } catch (error) {
        console.error('Conversion failed:', error);
      }
    };

    const debounce = setTimeout(convert, 500);
    return () => clearTimeout(debounce);
  }, [value, currency]);

  return (
    <div className={className}>
      <div className="relative">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="absolute right-3 top-2 text-gray-500 font-medium">
          {currency}
        </span>
      </div>
      {convertedValue && (
        <div className="mt-1 text-sm text-gray-600">
          ≈ {currency === 'NGN' 
            ? currencyService.formatEth(convertedValue)
            : currencyService.formatNaira(convertedValue)
          }
        </div>
      )}
    </div>
  );
};