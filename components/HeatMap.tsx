
// import React, { useState, useRef } from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import { Tooltip } from 'react-tooltip';
// import 'react-calendar-heatmap/dist/styles.css';

// interface HeatMapData {
//   date: string;
//   value: number;
// }

// interface HeatMapProps {
//   data: HeatMapData[];
//   title?: string;
// }

// const HeatMap: React.FC<HeatMapProps> = ({ data, title = "Activity Heatmap" }) => {
//   const [startDate] = useState<Date>(new Date('2024-01-01'));
//   const [endDate] = useState<Date>(new Date('2024-12-31'));
//   const [tooltipId] = useState<string>(`heatmap-tooltip-${Math.random().toString(36).substr(2, 9)}`);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
  
//   const formattedData = data.map(item => ({
//     date: item.date,
//     count: item.value
//   }));

//   const maxValue = Math.max(...formattedData.map(item => item.count), 4);

//   const handleScroll = (direction: 'left' | 'right') => {
//     if (!scrollContainerRef.current) return;
    
//     const scrollAmount = 350;
//     const container = scrollContainerRef.current;
    
//     if (direction === 'left') {
//       container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'short', 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   return (
//     <div className="w-full mt-2 p-3 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="m-0 text-lg font-semibold text-gray-800">{title}</h2>
//         <div className="flex items-center text-xs text-gray-500">
//           <span>Less</span>
//           <ul className="flex mx-1 list-none">
//             <li className="w-2.5 h-2.5 bg-gray-200 rounded-sm mx-0.5"></li>
//             <li className="w-2.5 h-2.5 bg-green-300 rounded-sm mx-0.5"></li>
//             <li className="w-2.5 h-2.5 bg-green-500 rounded-sm mx-0.5"></li>
//             <li className="w-2.5 h-2.5 bg-green-700 rounded-sm mx-0.5"></li>
//             <li className="w-2.5 h-2.5 bg-green-900 rounded-sm mx-0.5"></li>
//           </ul>
//           <span>More</span>
//         </div>
//       </div>
      
//       <div className="relative flex items-center w-full">
//         <button 
//           className="absolute left-0 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 font-bold cursor-pointer shadow-sm hover:bg-gray-100"
//           onClick={() => handleScroll('left')}
//           aria-label="Scroll left"
//         >
//           &lt;
//         </button>
        
//         <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 w-full mx-6" ref={scrollContainerRef}>
//           <CalendarHeatmap
//             startDate={startDate}
//             endDate={endDate}
//             values={formattedData}
//             classForValue={(value) => {
//               if (!value || value.count === 0) return 'fill-gray-200';
//               const intensity = Math.min(Math.ceil((value.count / maxValue) * 4), 4);
//               return [
//                 'fill-gray-200',
//                 'fill-green-300',
//                 'fill-green-500',
//                 'fill-green-700',
//                 'fill-green-900'
//               ][intensity];
//             }}
//             //@ts-ignore
//             tooltipDataAttrs={(value: any) => {
//               if (!value || !value.date) return {};
              
//               return {
//                 'data-tooltip-id': tooltipId,
//                 'data-tooltip-content': JSON.stringify({ date: value.date, count: value.count }),
//                 'data-tooltip-variant': 'light',
//                 'className': 'cursor-pointer stroke-white stroke-[1px] rounded-sm'
//               };
//             }}
//             showWeekdayLabels={true}
//             gutterSize={3}
//           />
          
//           <Tooltip
//             id={tooltipId}
//             render={({ content }) => {
//               if (!content) return null;
              
//               try {
//                 const data = JSON.parse(content);
//                 return (
//                   <div className="p-2 text-sm bg-white text-gray-800 rounded-lg shadow-md">
//                     <div className="font-semibold text-base">{formatDate(data.date)}</div>
//                     <div className="text-xs text-gray-500">
//                       {data.count === 0 ? 'No activity' : `${data.count} activities`}
//                     </div>
//                   </div>
//                 );
//               } catch (e) {
//                 return null;
//               }
//             }}
//             style={{
//               backgroundColor: 'white',
//               color: '#333',
//               boxShadow: '0 3px 12px rgba(0, 0, 0, 0.15)',
//               borderRadius: '6px',
//               padding: '0',
//               zIndex: 1000,
//               border: 'none'
//             }}
//           />
//         </div>
        
//         <button 
//           className="absolute right-0 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 font-bold cursor-pointer shadow-sm hover:bg-gray-100"
//           onClick={() => handleScroll('right')}
//           aria-label="Scroll right"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeatMap;
// import React, { useState, useRef } from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import { Tooltip } from 'react-tooltip';
// import 'react-calendar-heatmap/dist/styles.css';

// interface HeatMapData {
//   date: string;
//   value: number;
// }

// interface HeatMapProps {
//   data: HeatMapData[];
//   title?: string;
// }

// const HeatMap: React.FC<HeatMapProps> = ({ data, title = "Activity Heatmap" }) => {
//   const [startDate] = useState<Date>(new Date('2024-01-01'));
//   const [endDate] = useState<Date>(new Date());
//   const [tooltipId] = useState<string>(`heatmap-tooltip-${Math.random().toString(36).substr(2, 9)}`);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const formattedData = data.map(item => ({
//     date: item.date,
//     count: item.value
//   }));

//   const maxValue = Math.max(...formattedData.map(item => item.count), 4);

//   const handleScroll = (direction: 'left' | 'right') => {
//     if (!scrollContainerRef.current) return;

//     const scrollAmount = 350;
//     const container = scrollContainerRef.current;

//     if (direction === 'left') {
//       container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'short', 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   return (
//     <div className="w-full mt-2 p-4 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//         <div className="flex items-center text-xs text-gray-500">
         
//         </div>
//       </div>

//       <div className="relative flex items-center w-full">
//         <button 
//           className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 font-bold cursor-pointer shadow-sm hover:bg-gray-100"
//           onClick={() => handleScroll('left')}
//           aria-label="Scroll left"
//         >
//           &lt;
//         </button>

//         <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 w-full px-10" ref={scrollContainerRef}>
//           <div className="min-w-[900px]"> {/* Prevent shrinking */}
//             <CalendarHeatmap
//               startDate={startDate}
//               endDate={endDate}
//               values={formattedData}
//               classForValue={(value) => {
//                 if (!value || value.count === 0) return 'fill-gray-200';
//                 const intensity = Math.min(Math.ceil((value.count / maxValue) * 4), 4);
//                 return [
//                   'fill-gray-200',
//                   'fill-green-300',
//                   'fill-green-500',
//                   'fill-green-700',
//                   'fill-green-900'
//                 ][intensity];
//               }}
//               //@ts-ignore
//               tooltipDataAttrs={(value: any) => {
//                 if (!value || !value.date) return {};
//                 return {
//                   'data-tooltip-id': tooltipId,
//                   'data-tooltip-content': JSON.stringify({ date: value.date, count: value.count }),
//                   'data-tooltip-variant': 'light',
//                   'className': 'cursor-pointer stroke-white stroke-[1px] rounded-sm'
//                 };
//               }}
//               showWeekdayLabels={true}
//               gutterSize={3}
//             />
//           </div>
          
//           <Tooltip
//             id={tooltipId}
//             render={({ content }) => {
//               if (!content) return null;
//               try {
//                 const data = JSON.parse(content);
//                 return (
//                   <div className="p-2 text-sm bg-white text-gray-800 rounded-lg shadow-md">
//                     <div className="font-semibold text-base">{formatDate(data.date)}</div>
//                     <div className="text-xs text-gray-500">
//                       {data.count === 0 ? 'No activity' : `${data.count} activities`}
//                     </div>
//                   </div>
//                 );
//               } catch (e) {
//                 return null;
//               }
//             }}
//             style={{
//               backgroundColor: 'white',
//               color: '#333',
//               boxShadow: '0 3px 12px rgba(0, 0, 0, 0.15)',
//               borderRadius: '6px',
//               padding: '0',
//               zIndex: 1000,
//               border: 'none'
//             }}
//           />
//         </div>

//         <button 
//           className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 font-bold cursor-pointer shadow-sm hover:bg-gray-100"
//           onClick={() => handleScroll('right')}
//           aria-label="Scroll right"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeatMap;

import React, { useState, useRef } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

interface HeatMapData {
  date: string;
  value: number;
}

interface HeatMapProps {
  data: HeatMapData[];
  title?: string;
}

const HeatMap: React.FC<HeatMapProps> = ({ data, title = "Activity Heatmap" }) => {
  const [startDate] = useState<Date>(new Date('2024-01-01'));
  const [endDate] = useState<Date>(new Date());
  const [tooltipId] = useState<string>(`heatmap-tooltip-${Math.random().toString(36).substr(2, 9)}`);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formattedData = data.map(item => ({
    date: item.date,
    count: item.value
  }));

  const maxValue = Math.max(...formattedData.map(item => item.count), 4);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 350;
    const container = scrollContainerRef.current;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Add custom CSS for the heatmap
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .react-calendar-heatmap .color-empty { fill: #e5e7eb; }
      .react-calendar-heatmap .color-scale-1 { fill: #86efac; }
      .react-calendar-heatmap .color-scale-2 { fill: #4ade80; }
      .react-calendar-heatmap .color-scale-3 { fill: #22c55e; }
      .react-calendar-heatmap .color-scale-4 { fill: #15803d; }
      
      .react-calendar-heatmap rect:hover {
        stroke: #374151;
        stroke-width: 1px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full mt-2 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center text-xs text-gray-500 self-start sm:self-auto">
          <span className="mr-1">Less</span>
          <div className="flex">
            <div className="w-3 h-3 bg-gray-200 rounded-sm mr-1"></div>
            <div className="w-3 h-3 bg-green-200 rounded-sm mr-1"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm mr-1"></div>
            <div className="w-3 h-3 bg-green-600 rounded-sm mr-1"></div>
            <div className="w-3 h-3 bg-green-800 rounded-sm mr-1"></div>
          </div>
          <span className="ml-1">More</span>
        </div>
      </div>

      <div className="relative flex items-center w-full">
        <button 
          className="absolute left-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 font-bold cursor-pointer shadow-sm hover:bg-gray-100"
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          &lt;
        </button>

        <div className="overflow-x-auto w-full px-10" ref={scrollContainerRef}>
          <div className="min-w-[900px]"> {/* Prevent shrinking */}
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={formattedData}
              classForValue={(value) => {
                if (!value || value.count === 0) return 'color-empty';
                const intensity = Math.min(Math.ceil((value.count / maxValue) * 4), 4);
                return `color-scale-${intensity}`;
              }}
              //@ts-ignore
              tooltipDataAttrs={(value: any) => {
                if (!value || !value.date) return {};
                return {
                  'data-tooltip-id': tooltipId,
                  'data-tooltip-content': JSON.stringify({ date: value.date, count: value.count }),
                  'data-tooltip-variant': 'light',
                };
              }}
              showWeekdayLabels={true}
              gutterSize={3}
            />
          </div>
          
          <Tooltip
            id={tooltipId}
            render={({ content }) => {
              if (!content) return null;
              try {
                const data = JSON.parse(content);
                return (
                  <div className="p-2 text-sm bg-white text-gray-800 rounded-lg shadow-md">
                    <div className="font-semibold text-base">{formatDate(data.date)}</div>
                    <div className="text-xs text-gray-500">
                      {data.count === 0 ? 'No activity' : `${data.count} activities`}
                    </div>
                  </div>
                );
              } catch (e) {
                return null;
              }
            }}
            style={{
              backgroundColor: 'white',
              color: '#333',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '6px',
              padding: '0',
              zIndex: 1000,
              border: 'none'
            }}
          />
        </div>

        <button 
          className="absolute right-0 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 font-bold cursor-pointer shadow-sm hover:bg-gray-100"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HeatMap;