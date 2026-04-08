import { useEffect } from 'react';
import { Accordion, Placeholder } from 'react-bootstrap';

const AccordionPlaceholder = () => {
  
  useEffect(() => {
    document.title = 'CPMS | Loading Students...';
  }, []);

  return (
    <Accordion defaultActiveKey="0" flush className="flex flex-col gap-4">
      {['Fourth Year', 'Third Year', 'Second Year', 'First Year'].map((year, index) => (
        <Accordion.Item
          key={index}
          eventKey={index.toString()}
          className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400"
        >
          <Accordion.Header>{year}</Accordion.Header>
          <Accordion.Body>
            <div className="flex flex-col gap-3">
              {/* Simulating the Department nested accordion and Table rows */}
              <Placeholder as="div" animation="wave">
                <Placeholder xs={3} className="mb-3 rounded" /> {/* Dept Name Placeholder */}
                <div className="space-y-2">
                  {[...Array(3)].map((_, idx) => (
                    <Placeholder key={idx} xs={12} className="rounded py-2" />
                  ))}
                </div>
              </Placeholder>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default AccordionPlaceholder;