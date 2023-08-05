import os
import luigi

import logging
logger = logging.getLogger('luigi-interface')


class QueryTask(luigi.Task):
    def get_output_path(self, context, date=None):
        if date:
            return os.path.join('tmp', self.date.strftime("%Y-%m-%d"), context.module, str(self))
        else:
            return os.path.join('tmp', context.module, str(self))

    def run_query(self):
        raise NotImplemented()

    def run(self):
        result = self.run_query()
        logger.info("%s: td.job.url: %s", self, result.job.url)
        result.wait()
        status = result.status()
        if status != 'success':
            debug = result.job.debug
            if debug and debug['stderr']:
                logger.error(debug['stderr'])
            raise RuntimeError("job {0} {1}".format(result.job_id, status))
        with self.output().open('w') as f:
            f.write(str(result.job_id))
