import * as React from 'react';
import { EEntityType, File } from '@redbull/services';
import bridgeServices from '../api/service';

type TReturn = [File | null, boolean, string];

const useGetSelectedProductImage = (
  id: string | null,
  name: string,
  collection: File[]
): TReturn => {
  const [error, setError] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getFile = React.useCallback(
    async (fileId: number, fileName: string) => {
      setLoading(true);

      // get File Entity based on the fileId from the API
      // it either returns the correct image or return 401 unauthorized
      const file = await bridgeServices.getEntity<File>({
        entityName: EEntityType.FILE,
        id: fileId,
      });

      if (!file.hasError) {
        setImage(file.value);
        setLoading(false);
        return;
      }

      // if it returns error get the partial file properties
      // from the collection
      // in this case the collection was the array of stories coming from
      // getProductImages
      const partialImage = collection.find((f) => f.filename === fileName);
      if (partialImage) {
        const fullImage = await bridgeServices.getEntity<File>({
          entityName: EEntityType.FILE,
          id: partialImage.id,
        });
        if (!fullImage.hasError) {
          setImage(fullImage.value);
          setLoading(false);
          return;
        }
      }

      // if nothing can be found then return error.
      setLoading(false);
      setError('Unable to find product image');
    },
    [collection]
  );
  React.useEffect(() => {
    if (id || name) {
      getFile(+(id || 0), name);
    }
  }, [getFile, id, name]);

  return [image, loading, error];
};

export default useGetSelectedProductImage;
