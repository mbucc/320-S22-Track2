
import Split from 'react-Split';
import BPTreeView from '../../components/business-process/tree/core';
import BPActivityView from '../../components/business-process/activity/core';
import {BPColors, BPStandards} from '../../utils/business-process/standards';

const E = () => {
    return (
         
        <Split 
            direction= 'vertical'
            minSize= {200}
            className='style'
            style={{ 
                height: '100%',
                width: '100%',
                backgroundColor: BPColors.border,
                overflowY: 'scroll'
                
            }}
        >
            <div 
                style={{ 
                }}
            >
                <BPTreeView />
            </div>
            <div  
                style={{ 
                }}
            >
                <BPActivityView />
            </div>
        </Split>
        
 
         
    );
}
export default E;