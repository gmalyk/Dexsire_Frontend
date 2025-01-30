import React, { useState } from 'react'
import { ImageName, ImagePreview, ImageSize, PreviewCardContainer, PreviewCardContent, ProgressContainer } from './styled'
import { Progress } from 'reactstrap';
import ProgressBar from 'components/Form/ProgressBar';
import Button from 'components/Form/Button';
import { Icon } from 'ui/styled';

export default function PreviewCard({ url, name, size, onRemove }) {
  const [progress, setProgress] = useState(0);

  const formatSizeInMB = (sizeInBytes) => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(2);
  };

  return (
    <>
      <PreviewCardContent progress={progress}>
        <PreviewCardContainer>
          <ImagePreview image={url} />
          <ProgressContainer>
            <ImageName>{name}</ImageName>
            {!progress ?
              <ImageSize>{formatSizeInMB(size)}mb - Upload completed</ImageSize> :
              <ProgressBar progress={progress} setProgress={setProgress} />
            }
          </ProgressContainer>
        </PreviewCardContainer>
        {progress ?
          <Button width={'93px'} small nospace>
            Cancel
          </Button> :
          <>
            <Icon icon="delete" pointer onClick={() => onRemove(name)} />
          </>
        }
      </PreviewCardContent>
    </>
  )
}