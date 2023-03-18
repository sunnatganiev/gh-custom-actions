const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // 1) Get Some Input Values
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegioin = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegioin}`);

  const websiteUrl = `http://${bucket}.s3-website.${bucketRegioin}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl);
}

run();
