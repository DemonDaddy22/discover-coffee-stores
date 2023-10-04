import { useCallback, useState } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState<string>('');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  const onSuccess: PositionCallback = useCallback(position => {
    const { latitude, longitude } = position.coords;
    setLocation(`${latitude},${longitude}`);
    setLocationError(null);
    setLocationLoading(false);
  }, []);

  const onError: PositionErrorCallback = useCallback(() => {
    setLocationError('Unable to retrieve your location');
    setLocationLoading(false);
  }, []);

  const handleTrackLocation = useCallback(() => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, [onSuccess, onError]);

  return {
    location,
    locationError,
    locationLoading,
    handleTrackLocation,
  };
};

export default useLocation;
